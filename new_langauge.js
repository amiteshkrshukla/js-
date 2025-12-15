// AmiLang - single file improved implementation
// Keywords (Hindi / English blend):
// lo      -> declare (const)
// likho   -> print
// agar    -> if
// warna   -> else
// jabtak  -> while
// func    -> function
// lautao  -> return
// aur     -> logical AND (&&)
// ya      -> logical OR  (||)

/////////////////////
// LEXER
/////////////////////
function lexer(input) {
  const tokens = [];
  let i = 0;

  const isAlpha = ch => /[a-zA-Z_]/.test(ch);
  const isAlnum = ch => /[a-zA-Z0-9_]/.test(ch);
  const isDigit = ch => /[0-9]/.test(ch);

  while (i < input.length) {
    let ch = input[i];

    // whitespace
    if (/\s/.test(ch)) { i++; continue; }

    // comments (// to end of line)
    if (ch === '/' && input[i+1] === '/') {
      i += 2;
      while (i < input.length && input[i] !== '\n') i++;
      continue;
    }

    // numbers (ints and floats)
    if (isDigit(ch)) {
      let num = '';
      while (i < input.length && (isDigit(input[i]) || input[i] === '.')) {
        num += input[i++];
      }
      tokens.push({ type: 'NUMBER', value: parseFloat(num) });
      continue;
    }

    // strings "..." or '...'
    if (ch === '"' || ch === "'") {
      const quote = ch;
      i++;
      let str = '';
      while (i < input.length && input[i] !== quote) {
        if (input[i] === '\\' && i + 1 < input.length) {
          // simple escapes
          const next = input[i+1];
          if (next === 'n') { str += '\n'; i += 2; continue; }
          if (next === 't') { str += '\t'; i += 2; continue; }
          str += next; i += 2; continue;
        }
        str += input[i++];
      }
      i++; // skip closing quote
      tokens.push({ type: 'STRING', value: str });
      continue;
    }

    // identifiers / keywords
    if (isAlpha(ch)) {
      let id = '';
      while (i < input.length && isAlnum(input[i])) id += input[i++];
      // keywords
      const kw = ['lo','likho','agar','warna','jabtak','func','lautao','aur','ya'];
      if (kw.includes(id)) tokens.push({ type: 'KW', value: id });
      else tokens.push({ type: 'IDENT', value: id });
      continue;
    }

    // two-char operators
    const two = input.slice(i, i+2);
    if (two === '==' || two === '!=' || two === '>=' || two === '<=' || two === '||' || two === '&&') {
      tokens.push({ type: 'OP', value: two });
      i += 2;
      continue;
    }

    // single-char operators / punctuation
    const singleMap = {
      '+':'OP', '-':'OP', '*':'OP', '/':'OP', '%':'OP',
      '=':'ASSIGN', '>':'OP', '<':'OP', '(':'LP', ')':'RP', '{':'LB', '}':'RB', ',':'COMMA', ';':'SEMICOLON'
    };
    if (singleMap[ch]) {
      tokens.push({ type: singleMap[ch], value: ch });
      i++;
      continue;
    }

    throw new Error('Unknown character in input: ' + ch);
  }

  tokens.push({ type: 'EOF' });
  return tokens;
}

/////////////////////
// PARSER (Recursive descent with precedence)
/////////////////////
function Parser(tokens) {
  this.tokens = tokens;
  this.pos = 0;
  this.peek = () => this.tokens[this.pos];
  this.next = () => this.tokens[this.pos++];
}

Parser.prototype.eat = function(type, value=null) {
  const t = this.peek();
  if (!t) throw new Error('Unexpected end of input');
  if (t.type !== type || (value !== null && t.value !== value)) {
    throw new Error(`Expected ${type}${value?('('+value+')'):''} but got ${t.type}${t.value?('('+t.value+')'):''}`);
  }
  return this.next();
};

// program -> statement*
Parser.prototype.program = function() {
  const body = [];
  while (this.peek().type !== 'EOF') {
    body.push(this.statement());
  }
  return { type: 'Program', body };
};

// statement -> declaration | print | if | while | funcDecl | exprStatement | return
Parser.prototype.statement = function() {
  const t = this.peek();

  if (t.type === 'KW' && t.value === 'lo') return this.declaration();
  if (t.type === 'KW' && t.value === 'likho') return this.printStmt();
  if (t.type === 'KW' && t.value === 'agar') return this.ifStmt();
  if (t.type === 'KW' && t.value === 'jabtak') return this.whileStmt();
  if (t.type === 'KW' && t.value === 'func') return this.funcDecl();
  if (t.type === 'KW' && t.value === 'lautao') return this.returnStmt();

  // expression statement (possible function call or assignment)
  const expr = this.expression();
  // optional semicolon
  if (this.peek().type === 'SEMICOLON') this.next();
  return { type: 'ExprStmt', expression: expr };
};

Parser.prototype.declaration = function() {
  // lo identifier (= expr)?
  this.eat('KW','lo');
  const nameTok = this.eat('IDENT');
  let init = null;
  if (this.peek().type === 'ASSIGN' || (this.peek().type === 'OP' && this.peek().value === '=')) {
    // support both ASSIGN token and OP '=' if lexer produced OP '='
    if (this.peek().type === 'ASSIGN') this.next();
    else this.next(); // '=' as OP
    init = this.expression();
  }
  if (this.peek().type === 'SEMICOLON') this.next();
  return { type: 'VarDecl', name: nameTok.value, init };
};

Parser.prototype.printStmt = function() {
  this.eat('KW','likho');
  const expr = this.expression();
  if (this.peek().type === 'SEMICOLON') this.next();
  return { type: 'Print', expression: expr };
};

Parser.prototype.ifStmt = function() {
  this.eat('KW','agar');
  const cond = this.expression();
  const consequent = this.blockOrStatement();
  let alternate = null;
  if (this.peek().type === 'KW' && this.peek().value === 'warna') {
    this.next();
    alternate = this.blockOrStatement();
  }
  return { type: 'If', test: cond, consequent, alternate };
};

Parser.prototype.whileStmt = function() {
  this.eat('KW','jabtak');
  const cond = this.expression();
  const body = this.blockOrStatement();
  return { type: 'While', test: cond, body };
};

Parser.prototype.funcDecl = function() {
  this.eat('KW','func');
  const nameTok = this.eat('IDENT');
  this.eat('LP');
  const params = [];
  if (this.peek().type !== 'RP') {
    do {
      const p = this.eat('IDENT');
      params.push(p.value);
      if (this.peek().type === 'COMMA') this.next();
      else break;
    } while (true);
  }
  this.eat('RP');
  const body = this.block();
  return { type: 'Function', name: nameTok.value, params, body };
};

Parser.prototype.returnStmt = function() {
  this.eat('KW','lautao');
  const expr = this.expression();
  if (this.peek().type === 'SEMICOLON') this.next();
  return { type: 'Return', argument: expr };
};

Parser.prototype.blockOrStatement = function() {
  if (this.peek().type === 'LB') return this.block();
  return this.statement();
};

Parser.prototype.block = function() {
  this.eat('LB');
  const body = [];
  while (this.peek().type !== 'RB') {
    body.push(this.statement());
  }
  this.eat('RB');
  return { type: 'Block', body };
};

// EXPRESSION PARSING with precedence (lowest -> highest)
// logical OR (ya) -> logical AND (aur) -> equality -> comparison -> add/sub -> mul/div -> unary -> call -> primary

Parser.prototype.expression = function() {
  return this.parseLogicalOr();
};

Parser.prototype.parseLogicalOr = function() {
  let node = this.parseLogicalAnd();
  while (this.peek().type === 'OP' && this.peek().value === '||' || (this.peek().type === 'KW' && this.peek().value === 'ya')) {
    // support 'ya' as keyword OR
    const opTok = this.next();
    const right = this.parseLogicalAnd();
    node = { type: 'Logical', operator: (opTok.value === 'ya' ? '||' : opTok.value), left: node, right };
  }
  return node;
};

Parser.prototype.parseLogicalAnd = function() {
  let node = this.parseEquality();
  while (this.peek().type === 'OP' && this.peek().value === '&&' || (this.peek().type === 'KW' && this.peek().value === 'aur')) {
    const opTok = this.next();
    const right = this.parseEquality();
    node = { type: 'Logical', operator: (opTok.value === 'aur' ? '&&' : opTok.value), left: node, right };
  }
  return node;
};

Parser.prototype.parseEquality = function() {
  let node = this.parseComparison();
  while (this.peek().type === 'OP' && (this.peek().value === '==' || this.peek().value === '!=')) {
    const op = this.next().value;
    const right = this.parseComparison();
    node = { type: 'Binary', operator: op, left: node, right };
  }
  return node;
};

Parser.prototype.parseComparison = function() {
  let node = this.parseAdd();
  while (this.peek().type === 'OP' && ['>','<','>=','<='].includes(this.peek().value)) {
    const op = this.next().value;
    const right = this.parseAdd();
    node = { type: 'Binary', operator: op, left: node, right };
  }
  return node;
};

Parser.prototype.parseAdd = function() {
  let node = this.parseMul();
  while (this.peek().type === 'OP' && (this.peek().value === '+' || this.peek().value === '-')) {
    const op = this.next().value;
    const right = this.parseMul();
    node = { type: 'Binary', operator: op, left: node, right };
  }
  return node;
};

Parser.prototype.parseMul = function() {
  let node = this.parseUnary();
  while (this.peek().type === 'OP' && (this.peek().value === '*' || this.peek().value === '/' || this.peek().value === '%')) {
    const op = this.next().value;
    const right = this.parseUnary();
    node = { type: 'Binary', operator: op, left: node, right };
  }
  return node;
};

Parser.prototype.parseUnary = function() {
  if (this.peek().type === 'OP' && (this.peek().value === '-' || this.peek().value === '!')) {
    const op = this.next().value;
    const arg = this.parseUnary();
    return { type: 'Unary', operator: op, argument: arg };
  }
  return this.parseCall();
};

Parser.prototype.parseCall = function() {
  let node = this.parsePrimary();
  while (this.peek().type === 'LP') {
    // call
    this.next(); // (
    const args = [];
    if (this.peek().type !== 'RP') {
      do {
        args.push(this.expression());
        if (this.peek().type === 'COMMA') this.next();
        else break;
      } while (true);
    }
    this.eat('RP');
    node = { type: 'Call', callee: node, arguments: args };
  }
  return node;
};

Parser.prototype.parsePrimary = function() {
  const t = this.peek();

  if (t.type === 'NUMBER') { this.next(); return { type: 'Literal', value: t.value }; }
  if (t.type === 'STRING') { this.next(); return { type: 'Literal', value: t.value }; }
  if (t.type === 'IDENT') { this.next(); return { type: 'Identifier', name: t.value }; }
  if (t.type === 'LP') {
    this.next();
    const node = this.expression();
    this.eat('RP');
    return node;
  }
  throw new Error('Unexpected token in primary: ' + JSON.stringify(t));
};

/////////////////////
// INTERPRETER
/////////////////////
function Environment(parent=null) {
  this.store = Object.create(null);
  this.parent = parent;
}
Environment.prototype.get = function(name) {
  if (name in this.store) return this.store[name];
  if (this.parent) return this.parent.get(name);
  throw new Error(`ReferenceError: ${name} is not defined`);
};
Environment.prototype.set = function(name, value) {
  this.store[name] = value;
  return value;
};

function ReturnValue(value) { this.value = value; }

function Interpreter() {
  this.global = new Environment();
  // add builtin 'print' as alias for likho
  this.global.set('print', (...args) => {
    console.log(...args);
    return null;
  });
}

Interpreter.prototype.evalProgram = function(program, env=this.global) {
  let result = null;
  for (const node of program.body) {
    result = this.evaluate(node, env);
    // handle return bubbling
    if (result instanceof ReturnValue) return result;
  }
  return result;
};

Interpreter.prototype.evaluate = function(node, env) {
  switch (node.type) {
    case 'Program':
      return this.evalProgram(node, env);

    case 'VarDecl': {
      const val = node.init ? this.evaluate(node.init, env) : null;
      env.set(node.name, val);
      return val;
    }

    case 'Print': {
      const v = this.evaluate(node.expression, env);
      console.log(v);
      return null;
    }

    case 'ExprStmt':
      return this.evaluate(node.expression, env);

    case 'Literal':
      return node.value;

    case 'Identifier':
      return env.get(node.name);

    case 'Binary': {
      const l = this.evaluate(node.left, env);
      const r = this.evaluate(node.right, env);
      switch (node.operator) {
        case '+': return l + r;
        case '-': return l - r;
        case '*': return l * r;
        case '/': return l / r;
        case '%': return l % r;
        case '==': return l == r;
        case '!=': return l != r;
        case '>': return l > r;
        case '<': return l < r;
        case '>=': return l >= r;
        case '<=': return l <= r;
      }
      throw new Error('Unknown binary op ' + node.operator);
    }

    case 'Logical': {
      if (node.operator === '||' || node.operator === 'ya') {
        const l = this.evaluate(node.left, env);
        if (l) return l;
        return this.evaluate(node.right, env);
      }
      if (node.operator === '&&' || node.operator === 'aur') {
        const l = this.evaluate(node.left, env);
        if (!l) return l;
        return this.evaluate(node.right, env);
      }
      // if op written literally (lexer returns '||' or '&&')
      if (node.operator === '||') {
        const l = this.evaluate(node.left, env);
        if (l) return l;
        return this.evaluate(node.right, env);
      }
      if (node.operator === '&&') {
        const l = this.evaluate(node.left, env);
        if (!l) return l;
        return this.evaluate(node.right, env);
      }
      throw new Error('Unknown logical op ' + node.operator);
    }

    case 'Unary': {
      const val = this.evaluate(node.argument, env);
      if (node.operator === '-') return -val;
      if (node.operator === '!') return !val;
      throw new Error('Unknown unary op ' + node.operator);
    }

    case 'If': {
      const cond = this.evaluate(node.test, env);
      if (cond) return this.evaluate(node.consequent, env);
      if (node.alternate) return this.evaluate(node.alternate, env);
      return null;
    }

    case 'Block': {
      const localEnv = new Environment(env);
      let res = null;
      for (const stmt of node.body) {
        res = this.evaluate(stmt, localEnv);
        if (res instanceof ReturnValue) return res;
      }
      return res;
    }

    case 'While': {
      while (this.evaluate(node.test, env)) {
        const r = this.evaluate(node.body, env);
        if (r instanceof ReturnValue) return r;
      }
      return null;
    }

    case 'Function': {
      const fnObj = {
        type: 'UserFunction',
        params: node.params,
        body: node.body,
        env // closure
      };
      env.set(node.name, fnObj);
      return fnObj;
    }

    case 'Call': {
      const callee = this.evaluate(node.callee, env);
      const args = node.arguments.map(a => this.evaluate(a, env));
      // builtins
      if (typeof callee === 'function') return callee(...args);
      if (callee && callee.type === 'UserFunction') {
        const local = new Environment(callee.env);
        for (let i=0; i<callee.params.length; i++) {
          local.set(callee.params[i], args[i]);
        }
        const ret = this.evaluate(callee.body, local);
        if (ret instanceof ReturnValue) return ret.value;
        return null;
      }
      throw new Error('Not a function to call');
    }

    case 'Return': {
      const v = this.evaluate(node.argument, env);
      return new ReturnValue(v);
    }

    default:
      throw new Error('Unknown node type in evaluate: ' + node.type);
  }
};

/////////////////////
// CLI / Runner glue
/////////////////////
function runSource(source) {
  const tokens = lexer(source);
  const parser = new Parser(tokens);
  const ast = parser.program();
  const interpreter = new Interpreter();
  return interpreter.evalProgram(ast);
}

/////////////////////
// Export for node run
/////////////////////
if (require.main === module) {
  const fs = require('fs');
  const path = process.argv[2] || null;
  if (!path) {
    console.log('Usage: node amilang.js file.am');
    console.log('Example keywords: lo, likho, agar, warna, jabtak, func, lautao, aur, ya');
    process.exit(0);
  }
  const src = fs.readFileSync(path, 'utf8');
  runSource(src);
}

module.exports = { lexer, Parser, runSource };

lo x = 0
jabtak x < 5 {
  likho "x is", x
  lo x = x + 1
}
agar x == 5 {
  likho "x reached 5"
} warna {
  likho "something else"
}

func add(a, b) {
  lautao a + b
}

lo r = add(10, 20)
likho r

lo a = 1
lo b = 0
agar a && b {
  likho "both true"
} warna {
  likho "aur/ya demo", (a || b)
}

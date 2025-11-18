function lexer(input){
    const tokens=[];
    let cursor=0;
    
    while(cursor<input.length){
        let char=input[cursor];
        if(/\s/.test(char)){ //skip whitespace
            cursor++;
            continue;

        }
        if(/[a-zA-Z]/.test(char)){
            let word='';
            while(/[a-zA-Z0-9]/.test(char)){
                word+=char;
                char=input[++cursor];
            }
            if(word==='lo'|| word==='likho'){
                tokens.push({ type:'keyword',value: word});
            } 
            else{
                tokens.push({type:'identifier',value:word});
            }
            continue;

        }
        if(/[0-9]/.test(char)){
            let num ='';
            while(/[0-9]/.test(char)){
                num+=char;
                char=input[++cursor];
            }
            tokens.push({type:'number',value:parseInt(num)});
            continue;
        }
        if(/[\+\-\*\/=]/.test(char)){
            tokens.push({type:'opertor',value:char});
            cursor++;
            continue; 
        }
    }
    return tokens;
}
function parser(tokens){
    const ast={
        type:'program',
        body:[]
    };
    while(tokens.length>0){
        let token =tokens.shift();
        if(token.type==='keyword' && token.value==='lo'){
            let declaration={
                type:'declaration',
                name: tokens.shift().value,
                value:null
            };
            if(tokens[0].type ==='opertor' && tokens[0].value ==='='){
                tokens.shift();
                let expression ='';
                while(tokens.length>0 && tokens[0].type !== 'keyword'){
                    expression += tokens.shift().value;
        
                }
                declaration.value =  expression.trim();
            }
             ast.body.push(declaration);
        }
        if(token.type==='keyword' && token.value==='likho'){
            ast.body.push({
                type :'print',
                expression : tokens.shift().value
            });
        }
    }
    return ast;
}

function codeGen(node){
    switch(node.type){
        case 'program': return node.body.map(codeGen).join('\n');
            case 'declaration': return `const ${node.name} = ${node.value};`;
                case 'print': return `console.log(${node.expression});`;
    }
}

function compiler(input){
    const tokens =lexer(input);
    const ast =parser(tokens);
    const excutableCode =codeGen(ast);
    return excutableCode;

}

function runner(input){
    eval(input);
}

const code =`
lo x= 10
lo y =20
lo sum =x+y 
likho sum
`
const exec = compiler(code);
runner(exec);

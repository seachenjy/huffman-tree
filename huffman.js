/**
 * string to haffman code
 * @param {string} strings 
 */
function huffmanEncode(strings){
    let max=strings.length
    let hash={}
    for(let i=0;i<max;i++){
        let c = strings[i]
        hash.hasOwnProperty(c) ? hash[c]++ : hash[c]=1
    }
    let tree = []
    for(let i in hash){
        tree.push({
            n:hash[i],
            s:i
        })
    }
    
    makeTree(tree)

    var table = []
    var path = "1"
    
    traversing(table,tree[0],path)
    table.sort((a,b)=>{
        return hash[a[0]] > hash[b[0]] ? -1 : 1
    })
    writeTable(table,hash)
    console.log(tree)
}

function makeTree(tree){
    tree.sort((a,b)=>{
        return a.n < b.n ? -1 : 1
    })

    let _a = tree.splice(0,1)[0]
    let _b = tree.splice(0,1)[0]

    let node = {
        n:_a.n+_b.n,
        s:false,
        l:_a,
        r:_b
    }

    tree.push(node)

    if (tree.length > 1) {
        makeTree(tree)
    }
}


function writeTable(table,hash){
    var innerHTML = ""
    table.map(item=>{
        innerHTML += "<tr><td>"+item[0]+"</td><td>"+hash[item[0]]+"</td><td>"+item[1]+"</td></tr>"
    })

    document.getElementById("tables").innerHTML += "<table><tr><th>char</th><th>count</th><th>code</th></tr>"+innerHTML+"</table>"
}

/**
 * traversing huffman truee
 * @param {bool} table code table
 * @param {object} node huffman node
 * @param {string} path Last path
 * @return node,path if end return null,path
 */
function traversing(table,node,path){
    if (node.s !== false){
        table.push([node.s,path])
    }
    if(node.hasOwnProperty("l")){
        
        traversing(table,node.l,path + "0")
    }
    if(node.hasOwnProperty("r")){
        
        traversing(table,node.r,path + "1")
    }
}
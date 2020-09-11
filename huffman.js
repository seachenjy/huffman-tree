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
    writeStatis(hash)
    let tree = []
    for(let i in hash){
        tree.push({
            n:hash[i],
            s:i
        })
    }
    tree.sort((a,b)=>{
        return a.n < b.n ? -1 : 1
    })
    
    while(tree.length > 1){
        let _a = tree.splice(0,1)[0]
        let _b = tree.splice(0,1)[0]
        
        let node = {
            n:_a.n+_b.n,
            s:false,
            l:_a,
            r:_b
        }
        tree.push(node)
        tree.sort((a,b)=>{
            return a.n < b.n ? -1 : 1
        })
    }
    var table = []
    var path = "0"
    traversing(table,tree[0],path)
    writeTable(table)
}

function writeStatis(hash){
    var innerHTML = ""
    for(var i in hash){
        innerHTML += "<tr><td style='background:#eee'>"+i+"</td><td>"+hash[i]+"</td></tr>"
    }
    document.getElementById("tables").innerHTML += "<table>"+innerHTML+"</table>"
}

function writeTable(table){
    var innerHTML = ""
    table.map(item=>{
        innerHTML += "<tr><td style='background:#eee'>"+item[0]+"</td><td>"+item[1]+"</td></tr>"
    })

    document.getElementById("tables").innerHTML += "<table>"+innerHTML+"</table>"
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
        path += "0"
        traversing(table,node.l,path)
    }
    if(node.hasOwnProperty("r")){
        path += "1"
        traversing(table,node.r,path)
    }
    return table
}
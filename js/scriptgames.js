const endpoint ="https://g6acc15ccdc6b4c-db202109231930.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/games/games"
const id_ent = document.getElementById("id")
const developer_ent = document.getElementById("developer")
const minage_ent = document.getElementById("minage")
const category_id_ent = document.getElementById("category_id")
const name_ent = document.getElementById("name")


function peticionGet(){
  
    $.ajax({
    method:"GET",
    url:endpoint,
    success:function(data){
        console.log(data.items)        
        pintarTabla(data.items);
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error al consumir API Oracle Cloud")
    }
    });
}

function pintarTabla(items){
    let myTable="<table border=1><thead><tr><th>ID</th><th>Developer</th><th>Minimum Age</th><th>Category ID</th><th>Name</th><th>Delete</th></tr></thead><tbody>";
    for (i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].developer+"</td>";
        myTable+="<td>"+items[i].minage+"</td>";
        myTable+="<td>"+items[i].category_id+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td> <button onclick='peticionDelete("+items[i].id+")'>Delete</button>";
        myTable+="</tr></tbody>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
}

function peticionPost(){
    var id=document.getElementById("id").value;
    var developer=document.getElementById("developer").value;
    var minage=document.getElementById("minage").value;
    var category_id=document.getElementById("category_id").value;
    var name=document.getElementById("name").value;
    $.ajax({
        url:endpoint,
        type:"POST",
        data:{id:id,developer:developer,minage:minage,category_id:category_id,name:name},
        datatype:"JSON",
        complete:function(respuesta){
            console.log(respuesta.status)           
                $("#resultado").empty();
                $("#id").val("");
                $("#developer").val("");
                $("#minage").val("");
                $("#category_id").val("");
                $("#name").val("");
                peticionGet();
                alert("Se ha guardado el juego con el ID asignado")
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Error al consumir API Oracle Cloud")
        } 
    });    
}

function peticionPut() {

    const data = {
        id: id_ent.value,
        developer: developer_ent. value,
        minage: Number(minage_ent.value),
        category_id: Number(category_id_ent.value),
        name: name_ent.value,
    }
    let datasend = JSON.stringify(data)
    $.ajax({
        method: "PUT",
        url: endpoint,
        data: datasend,
        dataType: 'json',
        contentType: "application/json",
        complete: function (response) {
            console.log(response.status)
                $("#resultado").empty();
                $("#id").val("");
                $("#developer").val("");
                $("#minage").val("");
                $("#category_id").val("");
                $("#name").val("");
                alert("Se ha modificado el juego con el ID asignado")
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Error al consumir API Oracle Cloud")
        }
    });
    peticionGet();
}

function peticionDelete(id){
    data={"id":id};
    let datasend = JSON.stringify(data);
    $.ajax({
        method:"DELETE",
        url:endpoint,
        data:datasend,
        contentType:"application/json",
        dataType:'json',
        complete:function(respuesta){
            console.log(respuesta.status);
            $("#resultado").empty();
            peticionGet();
            alert("Se ha Eliminado.")
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Error al consumir API Oracle Cloud")
        }    
    });
 }
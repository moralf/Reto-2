const mensaje ="https://g6acc15ccdc6b4c-db202109231930.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message"
const id_ent = document.getElementById("id")
const message_ent = document.getElementById("messagetext")


 function peticionMensaje(){
    $.ajax({
    method:"GET",
    url:mensaje,
    success:function(data){
        console.log(data.items)        
        crearTabla(data.items);
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error al consumir API Oracle Cloud")
    }
    });
}

function crearTabla(items){
    let myTable="<table border=1><thead><tr><th>ID</th><th>Message</th><th>Delete</th></tr></thead><tbody>";
    for (i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].messagetext+"</td>";
        myTable+="<td> <button onclick='peticionQuitar("+items[i].id+")'>Delete</button>";
        myTable+="</tr></tbody>";
    }
    myTable+="</table>";
    $("#generar").append(myTable);
}

function peticionAdd(){
    var id=document.getElementById("id").value;
    var messagetext=document.getElementById("messagetext").value;
    $.ajax({
        url:mensaje,
        type:"POST",
        data:{id:id,messagetext:messagetext},
        datatype:"JSON",
        complete:function(respuesta){
            console.log(respuesta.status)
                $("#generar").empty();
                $("#id").val("");
                $("#messagetext").val("");
                peticionMensaje();
                alert("Se ha registrado su mensaje exitosamente con el ID asignado")
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Error al consumir API Oracle Cloud")
        }    
    });
}

function peticionMod(){

    const data = {  
        id: id_ent.value,
        messagetext: message_ent.value,
    }
    let datasend = JSON.stringify(data)
    $.ajax({
        method: "PUT",
        url:mensaje,
        data: datasend,
        dataType: 'json',
        contentType: "application/json",
        complete: function(respuesta){
            console.log(respuesta.status)
                $("#generar").empty();
                $("#id").val("");
                $("#messagetext").val("");
                alert("Se ha modificado su mensaje exitosamente con el ID asignado")
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Error al consumir API Oracle Cloud")
        }    
    });
    peticionMensaje();
}

function peticionQuitar(id){
    data={"id":id};
    let datasend = JSON.stringify(data);
    $.ajax({
        method:"DELETE",
        url:mensaje,
        data:datasend,
        contentType:"application/json",
        dataType:'json',
        complete:function(respuesta){
            console.log(respuesta.status);
            $("#generar").empty();
            peticionMensaje();
            alert("Se ha Eliminado su Mensaje")
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Error al consumir API Oracle Cloud")    
        }    
    });
 }

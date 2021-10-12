const cliente ="https://g6acc15ccdc6b4c-db202109231930.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client"
const id_ent = document.getElementById("id")
const name_ent = document.getElementById("name")
const email_ent = document.getElementById("email")
const age_ent = document.getElementById("age") 
 

function peticionCliente(){
    $.ajax({
    method:"GET",
    url:cliente,
    success:function(data){
        console.log(data.items)        
        generarTabla(data.items);
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error al consumir API Oracle Cloud")
    }
    });
}


function generarTabla(items){
    let myTable="<table border=1><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Delete</th></tr></thead><tbody>";
    for (i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td>"+items[i].age+"</td>";
        myTable+="<td> <button onclick='peticionBorrar("+items[i].id+")'>Delete</button>";
        myTable+="</tr></tbody>";
    }
    myTable+="</table>";
    $("#salida").append(myTable);
}


function peticionAgregar(){
    var id=document.getElementById("id").value;
    var name=document.getElementById("name").value;
    var age=document.getElementById("age").value;
    var email=document.getElementById("email").value;
    $.ajax({
        url:cliente,
        type: "POST",
        data:{id:id,name:name,age:age,email:email},
        dataType: 'JSON',
        complete:function(respuesta){
            console.log(respuesta.status)
                $("#salida").empty();
                $("#id").val("");
                $("#name").val("");
                $("#email").val("");
                $("#age").val("");
                peticionCliente();
                alert("Se ha generado su registro exitosamente con el ID asignado")
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Error al consumir API Oracle Cloud") 
        }    
    });
}


function peticionModificar(){

    const data = {  
        id: id_ent.value,
        name: name_ent.value,
        email: email_ent.value,
        age: Number(age_ent.value),
    }
    let datasend = JSON.stringify(data)
    $.ajax({
        method: "PUT",
        url:cliente,
        data: datasend,
        dataType: 'json',
        contentType: "application/json",
        complete: function(respuesta){
            console.log(respuesta.status)
                $("#salida").empty();
                $("#id").val("");
                $("#name").val("");
                $("#email").val("");
                $("#age").val("");
                alert("Se ha modificado su registro exitosamente con el ID asignado")
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Error al consumir API Oracle Cloud")
        }    
    });
    peticionCliente();
}


function peticionBorrar(id){
    data={"id":id};
    let datasend = JSON.stringify(data);
    $.ajax({
        method:"DELETE",
        url:cliente,
        data:datasend,
        contentType:"application/json",
        dataType:'json',
        complete:function(respuesta){
            console.log(respuesta.status);
                $("#salida").empty();
                peticionCliente();
                alert("Se ha Eliminado su registro.")
            },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Error al consumir API Oracle Cloud")
        }    
    });
}

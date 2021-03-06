﻿"use strict";

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/messages")
    .build();

//When we use access toekn we neen to attach accesstoken here like below
//No need to add anything when we use cookie authorization
//We need to setup authentication and token options in startup.cs
//var connection = new signalR.HubConnectionBuilder()
//    .withUrl("/messages", {
//        accessTokenFactory: () => "your access toekn here"
//    })
//    .build();

connection.on("ReceiveMessage", function (message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var div = document.createElement("div");
    div.innerHTML = msg + "<hr/>";
    document.getElementById("messages").appendChild(div);
});

connection.on("UserConnected", function (connectionId) {
    var groupElement = document.getElementById("group");
    var option = document.createElement("option");
    option.text = connectionId;
    option.value = connectionId;
    groupElement.add(option);
});

connection.on("UserDisconnected", function (connectionId) {
    var groupElement = document.getElementById("group");
    for (var i = 0; i <= groupElement.length; i++) {
        if (groupElement.option[i].value === connectionId) {
            groupElement.remove(i);
        }
    }
});
connection.start().catch(function (error) {
    return console.error(error.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var message = document.getElementById("message").value;
    var groupElement = document.getElementById("group");
    var groupValue = groupElement.options[groupElement.selectedIndex].value;

    if (groupValue === "All" || groupValue === "Myself") {
        var method = groupValue === "All" ? "SendMessageToAll" : "SendMessageToCaller";
        connection.invoke(method, message).catch(function (error) {
            return console.error(error.toString());
        });
    }
    else if (groupValue === "PrivateGroup")
        connection.invoke("SendMessageToGroup", "PrivateGroup", message).catch(function (error) {
            return console.error(error.toString());
        });
    else {
        connection.invoke("SendMessageToUser", groupValue , message).catch(function (error) {
            return console.error(error.toString());
        });
    }

    event.preventDefault();
});

document.getElementById("joinGroup").addEventListener("click", function (evevnt) {
    connection.invoke("JoinGroup", "PrivateGroup").catch(function (error) {
        return console.error(error.toString());
    });
    event.preventDefault();
})
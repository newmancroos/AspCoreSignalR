﻿"use strict";

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/messages")
    .build();

connection.on("ReceiveMessage", function (message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var div = document.createElement("div");
    div.innerHTML = msg + "<hr/>";
    document.getElementById("messages").appendChild(div);
});

connection.start().catch(function (error) {
    return console.error(error.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var message = document.getElementById("message").value;
    connection.invoke("SendMessageToAll", message).catch(function (error) {
        return console.error(error.toString());
    });
    event.preventDefault();
 });
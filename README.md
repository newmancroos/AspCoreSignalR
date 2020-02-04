# AspCoreSignalR
<div>
    What are the method we have to call a server update with no post back?
        <ul>
            <li>Polling</li>
            <li>Long Polling</li>
            <li>Server Event</li>
            <li>WebSocket</li>
            <li>*Signal R*</li>
        </ul>
        <p>
            <h3>Polling:</h3>
            In polling there will be multiple call to the server untile we get the result.
                    <img src="Images/Polling.JPG" />
            <pre>
                function doPoll(){
                    fetch('http://Sample/getresult', 
                    {
                        method: "POST",
                        body:{product, size};
                    })
                    .then(response = &gt; response.text())
                    .then(id =&gt; intervarId = setInterval(doPoll, 1000, id));
                });
            </pre>
            here untie we get the repy from server we keep on calling the url.
        </p>
        <p>
            <h3>Long Polling</h3>
            We request the server and server will keep open the connection until respond to the request, If there is no response within certain timeframe the request will timeout. If timeout happen browser will start requesting again with new request.
            <img src="Images/LongPolling.JPG" />
            <b>Server Side Code</b>
            <img src="Images/LongPollingServer_Example.JPG" />
            <b>Client Side Code</b>
            <img src="Images/LongPollingClient_Example.JPG" />
        </p>
        <p>
            <h3>Server Sent Events</h3>
            It is consider html5 feature.
            Server create http connection to the browser with Server Sent Event. Broswer will listen to the incomming message as stream and connection will remain open untile it actively close.
            <img src="Images/Server_Sent_Event.JPG" /><br>
            Server Side Code looks like below
            <img src="Images/Server_Sent_Event_Server_Code.JPG" /><br>
            Client side code looks like below
            <img src="Images/Server_Sent_Event_Client_Code.JPG" /><br>
        </p>
</div>
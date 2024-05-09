

># Client: Denis Marostegan

># Server: Matteo Gusparo

# Documentazione


## Cliente:
### Creazione Protocollo:
Creo il protocollo che uso nel progetto per mandare i dati;
**HTTP:**
tramite un endpoint e dei dati ottenuti tramite la simulazione di sensori, li invio al server con una richiesta post

**MQTT:**
tramite endpoint e il server di mosquito è possibile inviare messaggi, visualizzabili inoltre con il broker mqtt.fx

***
### Creazione Sensori:
Tramite una classe in entità creo i sensori utili al progetto (usato solo LevelBattery tramite consiglio del collega), usando 
JsonSerializer come serializzatore di json;
***
### Invio Dato:
Nel programma principale, per ogni json creato, lo serializzo per poi inviarlo al server che poi lo processerà adeguatamente

## Server:
Creato un database sqlite tramite utilizzo di dbeaver. apro la connessione nel index e in base alla richiesta http del client apro la connessione al database e leggo o invio dati ad esso.

# Processo di Lavoro
# Protocollo HTTP

## 04/04/2024

Inizio lavoro sul protocollo Html:

Cliente:
> invio messaggio tramite progetto in c# fornito al server;

Server:
> ricevitore del messaggio tramite progetto in c# fornito e tramite il programma ngrok per le comunicazioni;
> ## Problemi Riscontrati:
> Messaggio non in chiaro;
> Connessione al database;

----------------------------------------------

# Protocollo MQTT

## 11/04/2024

Invio dati dal cliente al databasee finalizzazione del protocollo http:

Cliente:
> ## Problemi Riscontrati:
> impossibilitato a mandare un json unico con il pacchetto utato, risolto mandando uno alla volta

Server:
> ## Problemi Riscontrati:
> ~~Non si riesce a creare un DB~~
> sistiemano il problema della creazione db e inserimento dati

## 18/04/2024

Invio dati dal cliente al databasee finalizzazione del protocollo mqtt:

Cliente:
> Inserita protocollo mqtt con ausilio test.mosquito.org

Server:

## Implementazione Comandi Avvanzti
all'interno della classe si è discusso su 4 esigenze che potrebbero essere utili al progetto che sono:
 1. conoscere/stampare in console lo stato di tutte le auto, limitatamente a:
	-   accesa: si/no
	-   velocità corrente
2. Mostrare le stesse informazioni su una pagina Web
3. Nel caso un auto si disconnetta per alcuni minuti, cosa accade ai comandi che eventualmente gli sono stati inviati?
	- Come evitare che li perda?
4. conoscere lo stato connesso / non connesso di un auto.
	- Come capire quando si è disconnessa?


# Client:

In principio creo json da inviare con mqtt al server, cos'ì la processione dei dati da parte del dispositivo iot non è importante per le specifiche hardware.

## Implementazione Esigenza 1

in un json di impostazione del broker imposto il **retainFalg** a **true**, quindi il messaggio verrà salvato sul messaggio e così permette di visionare i messaggi passasti, tramite pacchetto **PUBLISH**, lo si implementa nel topic : **carDM/allCarSatuts**.
Esempio di pacchetto **PUBLISH** (nell'esempio ho impostato il json come mostrato nei powerpoint):

```json
{
	"contains":{
		"packetId": 0001,
		"topicName": "topic/1",
	    "qos": 1,
		*"retainFlag": true,*
		"payload":{
			"Acceso": true,
			"Speed": 60,
		},
		"dupFlag": false
	}
}
```

## Implementazione Esigenza 2
per implementare l'accesso alle informazioni tramite una pagina web si può usare la funzione di **MQTT over WebSockets**, già implementata su MQTT, grazie a un codice in javascript descritto nel lato server. Non serve implementare nessun topic

## Implementazione Esigenza 3
Analogamente all'esigenza 1, si va a impostare tramite json stavolta la **CONNECT** il parametro **cleanSession** a false, così ho la possibilità di vedere tutti i messaggi inviati durante disconnessione al broker, non serve implementare nessun topic.
Esempio di pacchetto **CONNECT** (nell'esempio ho impostato il json come mostrato nei powerpoint):
```json
{
	"contains":{
		"clientId": "client-1",
		*"cleanSession": false,*
		"username": "hans",
		"password": "letmein"
		"lastWillTopic": "/hans/will"
		"lastWillQos": 2
		"lastWillMessage": "unexpected exit"
		"lastWillRetain": false
		"keepAlive": 60
	}
}
```
## Implementazione Esigenza 4
Per sapere se un client si è disconnesso o no si può impostare i flag di **Last Will and Testament** per poter inviare un messaggio di disconnessione al broker,
i flag sono impostabili nel pacchetto **CONNECT** (nell'esempio ho impostato il json come mostrato nei powerpoint), lo si implementa nel topic : **carDM/disconnectWarning**..
ES.:
```json
{
	"contains":{
		"clientId": "client-1",
		*"cleanSession": false,*
		"username": "hans",
		"password": "letmein"
		"lastWillTopic": "/hans/will"
		*"lastWillQos": 2*
		*"lastWillMessage": "unexpected exit"*
		*"lastWillRetain": false*
		*"keepAlive": 60*
	}
}
```

----------------------------------------------------

# Protocollo AQMP

## 09/05/2024

Client: 

Inserito il protocollo AQMP come espresso nel sito: "https://www.rabbitmq.com/tutorials/tutorial-one-dotnet"
> Collegamento al broker gratis CloudAMQP, con Littel Lemur come piano attivato.
> Invio dati tramite codice c#.

 esempio di codice di collegamento:

```c#
public async void Send(string data, string sensor)
{
    var factory = new ConnectionFactory
    {
        Uri = new Uri(_endpoint)
    };
    using var connection = factory.CreateConnection();
    using var channel = connection.CreateModel();

    channel.QueueDeclare(queue: "hello",
             durable: false,
             exclusive: false,
             autoDelete: false,
             arguments: null);

    var body = Encoding.UTF8.GetBytes($"{sensor}: {data}");
    channel.BasicPublish(exchange: string.Empty,
             routingKey: "hello",
             basicProperties: null,
             body: body);
    Console.WriteLine($" [x] Sent {sensor}: {data}");
}
```



># Client: Denis Marostegan

># Server: Matteo Gusparo

# Documentazione


## Cliente:
### Creazione Protocollo:
Creo il protocollo che uso nel progetto per mandare i dati;
**HTTP:**
tramite un endpoint e dei dati ottenuti tramite la simulazione di sensori, li invio al server con una richiesta post
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

## 11/04/2024

Invio dati dal cliente al databasee finalizzazione del protocollo http:

Cliente:
> ## Problemi Riscontrati:
> impossibilitato a mandare un json unico con il pacchetto utato, risolto mandando uno alla volta

Server:
> ## Problemi Riscontrati:
> ~~Non si riesce a creare un DB ~~
> sistiemano il problema della creazione db e inserimento dati
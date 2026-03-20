import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:viggo_ponturo_nygaard_esame_finale_flutter/models/apps_class.dart';
import 'package:http/http.dart' as http;
import 'package:viggo_ponturo_nygaard_esame_finale_flutter/shared/widget/apps_cards.dart';

class Homepage extends StatefulWidget {
  const Homepage({super.key});

  @override
  State<Homepage> createState() => _HomepageState();
}

class _HomepageState extends State<Homepage> {
  late Future<List<Appsclass>> futureGetApps;
  List<Appsclass> appsList =
      []; //^Questa lista serve per quando eliminiamo gli elementi
  bool showFavorites = false;

  bool isLoading = true;
  final CircularProgressIndicator loading = CircularProgressIndicator();

  @override
  void initState() {
    futureGetApps = getApps();
    super.initState();
  }

  //^Qui ci prendiamo le app dal json
  Future<List<Appsclass>> getApps() async {
    final responce = await http.get(
      Uri.parse(
        "https://my-json-server.typicode.com/zoelounge/menupizza/projects",
      ),
    );
    final jsonData = json.decode(responce.body) as List<dynamic>;

    final currentListApps = List.from(jsonData).map((item) {
      return Appsclass.fromJson(item);
    }).toList();
    appsList = currentListApps;
    return currentListApps;
  }

  //^Questa funzione serve per eliminare un app dalla nuova lista 'appsList'
  void deleteApp(Appsclass app) {
    setState(() {
      appsList.remove(app);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      //^AppBar
      appBar: AppBar(
        title: Text(
          "Esame finale Flutter",
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Colors.red[900],
        centerTitle: true,
        actions: [
          //^Pulsante che serve per mettere tutte le app preferite, fatto con un togle
          Padding(
            padding: const EdgeInsets.only(right: 10),
            child: IconButton(
              onPressed: () {
                setState(() {
                  showFavorites = !showFavorites;
                  for (var app in appsList) {
                    app.starOutline = !showFavorites;
                  }
                });
              },
              icon: Icon(Icons.stars_sharp, color: Colors.white),
            ),
          ),
        ],
      ),

      body: body(),
    );
  }

  Widget body() {
    return FutureBuilder(
      future: futureGetApps,
      builder: (context, snapshot) {
        //^Se stiamo aspettando i dati ce il 'CircularProgressIndicator'
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(child: loading);
        } else if (snapshot.connectionState == ConnectionState.none) {
          //^Se non c'é connessione fa vedere "Errore di connessione. Controllare la propria connessione"
          return Center(
            child: Text(
              "Errore di connessione. \n Controllare la propria connessione",
              style: TextStyle(fontSize: 20),
            ),
          );
        } else if (snapshot.hasError) {
          //^Se c'é un errore fa vedere l'errore
          return Text("Errore: ${snapshot.error.toString()}");
        } else {
          return Padding(
            padding: const EdgeInsets.all(8.0),
            //^Qui creo la lista degli elementi con 'ListView.separeted'
            child: ListView.separated(
              itemBuilder: (context, index) {
                return AppsCards(
                  currentApp: appsList[index],
                  onDelete: () => deleteApp(appsList[index]),
                );
              },
              separatorBuilder: (context, index) {
                return Divider();
              },
              itemCount: snapshot.data!.length,
            ),
          );
        }
      },
    );
  }
}

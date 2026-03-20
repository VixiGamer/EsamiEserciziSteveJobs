import 'package:flutter/material.dart';

//&Detailed page

class AppsCardDetailedPage extends StatefulWidget {
  final String target;
  final String name;
  final String image;
  final String description;
  final bool starOutline;

  const AppsCardDetailedPage({
    super.key,
    required this.target,
    required this.name,
    required this.image,
    required this.description,
    required this.starOutline,
  });

  @override
  State<AppsCardDetailedPage> createState() => _AppsCardDetailedPageState();
}

class _AppsCardDetailedPageState extends State<AppsCardDetailedPage> {
  late bool starOutline;

  @override
  void initState() {
    super.initState();
    starOutline = widget.starOutline;
  }

  @override
  Widget build(BuildContext context) {
    Icon starStatus() {
      return starOutline
          ? Icon(Icons.star_border, color: Colors.red[900])
          : Icon(Icons.star, color: Colors.red[900]);
    }

    return Scaffold(
      appBar: AppBar(
        title: Text("Detailed App", style: TextStyle(color: Colors.white)),
        centerTitle: true,
        backgroundColor: Colors.red[900],
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context, starOutline);
          },
          icon: Icon(Icons.arrow_back_ios_new_rounded, color: Colors.white),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: SingleChildScrollView(
          child: Column(
            spacing: 15,
            children: [
              //^Immaggine dell'app
              ClipRRect(
                borderRadius: BorderRadiusGeometry.circular(20),
                child: Image.network(widget.image),
              ),

              //^Titolo - Target - Stella preferito
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                spacing: 50,
                children: [
                  Text(
                    widget.name,
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  Text(widget.target, style: TextStyle(fontSize: 20)),
                  IconButton(
                    onPressed: () {
                      setState(() {
                        starOutline = !starOutline;
                      });
                    },
                    icon: starStatus(),
                  ),
                ],
              ),

              //^Descrizione
              Text(widget.description),
            ],
          ),
        ),
      ),

      //^Floating action Button per l'eliminazione del'app
      floatingActionButton: TextButton(
        onPressed: () {
          Navigator.pop(context, "deleteApp");
        },
        style: TextButton.styleFrom(
          backgroundColor: Colors.blue[800],
          overlayColor: Colors.blue[100],
        ),
        child: Text("Elimina", style: TextStyle(color: Colors.white)),
      ),
    );
  }
}

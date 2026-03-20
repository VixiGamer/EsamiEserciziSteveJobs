import 'package:flutter/material.dart';
import 'package:viggo_ponturo_nygaard_esame_finale_flutter/models/apps_class.dart';
import 'package:viggo_ponturo_nygaard_esame_finale_flutter/pages/apps_card_detailed_page.dart';

//&Card che genera ogni singolo ListTile

class AppsCards extends StatefulWidget {
  final Appsclass currentApp;
  final void Function() onDelete;
  const AppsCards({
    super.key,
    required this.currentApp,
    required this.onDelete,
  });

  @override
  State<AppsCards> createState() => _AppsCardsState();
}

class _AppsCardsState extends State<AppsCards> {
  @override
  Widget build(BuildContext context) {
    //^Facciamo tutto il ListTile un pulsante
    return TextButton(
      onPressed: () async {
        final result = await Navigator.push(    //?Qui diciamo di andare nella Detailed Page
          context,
          MaterialPageRoute(
            builder: (context) => AppsCardDetailedPage(
              target: widget.currentApp.target!,
              name: widget.currentApp.name!,
              image: widget.currentApp.image!,
              description: widget.currentApp.description!,
              starOutline: widget.currentApp.starOutline,
            ),
          ),
        );
        if (result == "deleteApp") {
          widget.onDelete();
        } else if (result is bool) {
          setState(() {
            widget.currentApp.starOutline = result;
          });
        }
      },

      child: ListTile(
        //^Immaggine dell'app
        leading: ClipRRect(
          borderRadius: BorderRadiusGeometry.circular(10),
          child: Image.network(widget.currentApp.image!, width: 65),
        ),
        title: Text(widget.currentApp.name!),     //^Titolo
        trailing: Row(                            //^Stella preferito e chevron
          mainAxisAlignment: MainAxisAlignment.end,
          mainAxisSize: MainAxisSize.min,
          spacing: 15,
          children: [
            Icon(
              widget.currentApp.starOutline == true
                  ? Icons.star_outline
                  : Icons.star,
              color: Colors.red[900],
              size: 23,
            ),
            Icon(Icons.chevron_right_rounded, size: 23),
          ],
        ),
      ),
    );
  }
}

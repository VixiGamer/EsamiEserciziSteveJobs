import 'package:flutter/material.dart';
import 'package:viggo_ponturo_nygaard_esame_finale_flutter/pages/homepage.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(child: const MaterialApp(debugShowCheckedModeBanner: false, home: Homepage(),));
  }
}

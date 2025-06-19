import 'package:flutter/material.dart';

void main() => runApp(UberCloneApp());

class UberCloneApp extends StatelessWidget {
  const UberCloneApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Uber Clone',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.indigo,
      ),
      home: WelcomeScreen(),
    );
  }
}

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Welcome to Uber Clone', style: TextStyle(fontSize: 24)),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Navigate to login
              },
              child: Text('Login'),
            ),
            ElevatedButton(
              onPressed: () {
                // Navigate to register
              },
              child: Text('Register'),
            ),
          ],
        ),
      ),
    );
  }
}

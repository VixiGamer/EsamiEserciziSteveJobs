/*!

inplementare un sistema backend node expres o dati fake o dati mongo che mappi o simuli il comportamento di incontri sportivi
team 1 team 2 score 1 score 2, venue.

XXX get che restituisca tutti i match - XXX get quesary parames (team 1 = milan) - get che restituisce tutti i mach over o under (la somma dei 2 goal)
XXX get che restituisca un singiolo match con id
XXX put modificare lo score (socre 1 e score 2)


*/


import express from "express";
import connectDB from "./config/db.js";
import Match from "./models/Match.js";

const app = express();
app.use(express.json());




//! Creazione nuovo match
app.post("/match", async (req, res) => {
    const newteam1 = req.body.team1
    const newteam2 = req.body.team2
    const newscore1 = req.body.score1
    const newscore2 = req.body.score2
    const newvenue = req.body.venue


    const newMatch = await Match.create(
        {
            team1: newteam1,
            team2: newteam2,
            score1: newscore1,
            score2: newscore2,
            venue: newvenue
        }
    );

    res.status(201).json({ messaggio: '✅ Match creato con successo', match: newMatch })

})



//! Lettura tutti i match
app.get("/match", async (req, res) => {
    const filter = req.query
    const allmatch = await Match.find(filter);

    if (allmatch) {
        res.status(200).json(allmatch)
    } else {
        res.status(404).json({ messaggio: '❌ Match non trovato' })
    }
})



//! Restituisce un determinato utente dandomi il suo id
app.get("/match/:id", async (req, res) => {
    const idMatch = req.params.id

    if (idMatch) {
        const match = await Match.findById(idMatch);

        if (!match) {
            return res.status(404).json({ messaggio: "❌ Match non trovato" })
        } else {
            return res.status(200).json({ messaggio: match })
        }
    }
})



//! Update di un match
app.put("/match/:id", async (req, res) => {
    try {
        const idMatch = req.params.id
        const newscore1 = req.body.score1
        const newscore2 = req.body.score2

        const updatedMatch = await Match.findByIdAndUpdate(
            idMatch,
            { score1: newscore1, score2: newscore2 },
            { new: true, runValidators: true }
        );

        if (!updatedMatch) {
            return res.status(404).json({ error: "❌ ERROR: Match non trovato" });
        }
        return res.status(201).json({ messaggio: '✅ Match aggiornato con successo', utente: updatedMatch });
    } catch (error) {
        return res.status(500).json({ messaggio: '❌ Errore Server' })
    }
})












const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => console.log(`🚀 Server avviato su http://localhost:${PORT}`))







/*

Utenti con età maggiore di 18
db.Matchs.find({ age: { $gt: 18 } })

Utenti con età minore o uguale a 30
db.Matchs.find({ age: { $lte: 30 } })

Età tra 18 e 30
db.Matchs.find({
  age: {
    $gte: 18,
    $lte: 30
  }
})


| Operatore | Significato             |
| --------- | ----------------------- |
| `$gt`     | maggiore di ( > )       |
| `$gte`    | maggiore o uguale ( ≥ ) |
| `$lt`     | minore di ( < )         |
| `$lte`    | minore o uguale ( ≤ )   |
| `$eq`     | uguale                  |
| `$ne`     | diverso                 |

*/
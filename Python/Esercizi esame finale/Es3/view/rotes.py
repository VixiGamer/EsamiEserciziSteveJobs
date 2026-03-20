from flask import request, render_template, redirect, url_for
from models.modelCreatures import db
from models.modelCreatures import ModelCreatureDB
from models.creatures import Creature, PokemonReader
from app import app

#§ Questa rotta "/" serve a mostrare la home page con la lista dei Pokemon salvati nel database
@app.route("/", methods=["GET"])
def home():
    creatures = ModelCreatureDB.query.all() 
    return render_template("index.html", creatures = creatures)


#§ Questa rotta "/add" serve a mostrare il form per aggiungere un nuovo Pokemon al database
@app.route("/add", methods = ["GET", "POST"])

#? Se la chiamata e 'GET' mostra il form per inserire o id il nome del Pokémon
#? Se la chiamata e 'POST' elabora i dati inviati

def add():
    if request.method == "POST":
        name = request.form.get("name", "").strip().lower()
        #^ Controllo se 'name' è vuoto o meno, e se e vuoto, ritorno un messaggio di errore

        if not name:
            return render_template("add.html", error="Inserisci il nome del Pokémon")

        try:
            pokemon = PokemonReader()
            pokemon_data = pokemon.request(name)

            if pokemon_data is None:
                return render_template("add.html", error="Pokémon inesistente o errore nella richiesta")
            
            creature = Creature(**pokemon_data)

            new_creature = ModelCreatureDB(
                id = creature.id,
                name = creature.name,
                height = creature.height,
                weight = creature.weight,
                types = ", ".join(creature.types),      #? Questo serve per unire le parole della lista in una stringa separate da ", "
                stats = str(creature.stats)             #? Questo serve a convertire un oggetto in una stringa
            )

            db.session.add(new_creature)    #? Questo prepara l'inserimento dei dati nel database
            db.session.commit()             #? Salva i dati definitivamente nel database
            print("✅ Pokemon aggiunto con successo al database")
            return redirect(url_for("home"))
        except Exception as e:
            print("❌ Errore durante l'aggiunta:", e)
            return render_template("add.html", error="Errore interno")
    return render_template("add.html")
        

#§ Questa rotta "/edit/<int:id>" serve a mostrare il form per modificare un Pokemon esistente nel database
@app.route("/edit/<int:id>", methods=["GET", "POST"])

#? Se la chiamata e 'GET' mostra il form dove modificare il Pokèmon
#? se la chiamata e 'POST' modifica i dati cambiati del Pokèmon

def edit(id):
    pokemondb = ModelCreatureDB.query.get(id)
    if pokemondb is None:
        return "❌ Pokemon non trovato", 404

    if request.method == "POST":

        pokemondb.name = request.form.get("name")
        pokemondb.height = request.form.get("height")
        pokemondb.weight = request.form.get("weight")
        pokemondb.types = request.form.get("types")
        pokemondb.stats = request.form.get("stats")

        db.session.commit()
        return redirect(url_for("home"))
    
    creature = Creature(
        id = pokemondb.id,
        name = pokemondb.name,
        height = pokemondb.height,
        weight = pokemondb.weight,
        types = pokemondb.types.split(", "),
        stats = pokemondb.stats
    )
    

    return render_template("edit.html", creature = creature)
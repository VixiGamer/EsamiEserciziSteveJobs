import json
import requests
import os

#§ Questa classe 'Creature' serve a mappare i dati grezzi che arrivano dall'API 'pokeapi'
class Creature:
    id: int
    name: str
    height: int
    weight: int
    types: list[str]
    stats: dict[str, int]

    #^ Cotruttore
    def __init__(self, **data_dict):        #? '**data_dict' sono KWARGS  che permette a una funzione di ricevere un numero variabile di argomenti keyword
        self.id = data_dict.get("id")
        self.name = data_dict.get("name")
        self.height = data_dict.get("height")
        self.weight = data_dict.get("weight")
        self.types = data_dict.get("types")
        self.stats = data_dict.get("stats")

    #^ Metodo '__str__' serve per decidere cosa deve stampare quando scriviamo 'print(oggetto)'
    def __str__(self):
        return f"Caratteristiche del Pokemon '{self.name.capitalize()}': \n ID: {self.id} \n Name: {self.name} \n Height: {self.height} \n Weight: {self.weight} \n Types: {self.types} \n Stats: {self.stats}"
        
    #^ Metodo che crea il dizzionario del Pokemon
    def to_dict(self):
        pokemon = {
            "id": self.id,
            "name": self.name,
            "height": self.height,
            "weight": self.weight,
            "types": self.types,
            "stats": self.stats
        }
        return pokemon

#§ Questa classe 'PokemonReader' serve a fare la richiesta all'API 'pokeapi' e a gestire gli errori
class PokemonReader:
    #^ Questa funzione fa la chiamata API del Pokemon
    def request(self, pokemon: str | int):
        #& Prova a eseguire questo codice
        try:
            pokemon = requests.get(f"https://pokeapi.co/api/v2/pokemon/{pokemon}", timeout = 3)
            pokemon.raise_for_status()
            pokejson = pokemon.json()

            #^ Cicla per tutti i tipi che ci sono nell'array dei 'types'
            types = []
            for t in pokejson["types"]:
                type = t["type"]["name"]
                types.append(type)

            #^ Cicla per tutte le 'stats' che ci sono nel json deelle 'stats'
            stats = {}
            for s in pokejson["stats"]:
                stat = s["stat"]["name"]
                val_stat = s["base_stat"]
                stats[stat] = val_stat

            formattedPokemon = {
                "id": pokejson["id"],
                "name": pokejson["name"],
                "height": pokejson["height"],
                "weight": pokejson["weight"],
                "types": types,
                "stats": stats
            }

            return formattedPokemon
            # print(formattedPokemon)

        #& Se ce qualche errore le l'except che lo gestisce senza fare crashare il programma
        except (requests.exceptions.Timeout):
            return print("❌ La richiesta ha richiesto troppo tempo")
        
        except (requests.exceptions.HTTPError):
            if pokemon.status_code == 404: 
                return print("❌ Pokemon INESISTENTE")
            else:
                return print("❌ Errore inaspettato")
            
        except (requests.exceptions.ConnectionError):
            return print("❌ Errore di connessione")
        
        except (requests.exceptions.RequestException) as e:
            return print(f"❌ Errore nella richiesta.\nERRORE: {e}")


#§ Questo metodo crea il file json del Pokemon
def createJson(pokemon):
    pokemons_folder = "Es2/data/creatures"

    #^ Se le cartelle esistono ok, se non esistono, le crea
    if not os.path.exists(pokemons_folder):
        os.makedirs(pokemons_folder)
        print(f"Cratelle '{pokemons_folder}' create con successo")
    

    poke_dict = pokemon.to_dict()
    if not poke_dict:
        return print("❌ Il dizionario del Pokémon è vuoto. Errore inaspettato")

    #^ Qui creo il file json del Pokemon, se gia esiste lo sovrascrive. Se non eiste lo crea.
    try:
        with open(f"{pokemons_folder}/{pokemon.name}.json", "w", encoding="utf-8") as file:
            json.dump(poke_dict, file, indent=4)
            print(f"✅ Dizionario per '{pokemon.name}' creato con successo")
            # print(poke_dict)
            return poke_dict
    except Exception as e:
        print(f"❌ Impossibile creare il file: {e}")


#§ Qui leggo il file json del Pokemon
def readJson(pokemon_name):
    pokemonFilePath = f"Es2/data/creatures/{pokemon_name.lower()}.json"

    #^ Qui cerco il file json del Pokemon e se esiste lo leggo, se non esiste da errore
    try:
        with open(pokemonFilePath, "r", encoding="utf-8") as file:
            pokemon_data = json.load(file)

            if not pokemon_data:
                return print("❌ Il file locale e vuoto")

            print(f"✅ Dati di '{pokemon_name}' letti con successo dal file.")
            # print(f" ID: {pokemon_data["id"]} \n Name: {pokemon_data["name"]} \n Height: {pokemon_data["height"]} \n Weight: {pokemon_data["weight"]} \n Types: {pokemon_data["types"]} \n Stats: {pokemon_data["stats"]}")
            return pokemon_data
    except FileNotFoundError:
        return print(f"❌ File {pokemon_name} inesistente")
    except Exception as e:
        return print(f"❌ Errore imprevisto: {e}")




#* Qui chiedo all'utente il nome o l'id del Pokemon
userInput = input("Inserisci il nome o l'Id del Pokemon: ")


userPokemon = PokemonReader().request(userInput.strip().lower())

if userPokemon is not None:
    pokemon = Creature(**userPokemon)
    print(pokemon)
    createJson(pokemon)

    reloadChoice = input("Vuoi ricaricare il Pokemon nel file locale? ")
    if reloadChoice == "si" or reloadChoice == "s" or reloadChoice == "yes" or reloadChoice == "y":
        pokemonLocal = readJson(pokemon.name)

        if pokemonLocal is not None:
            pokemonReload = Creature(**pokemonLocal)
            print(pokemonReload)
        else:
            print("❌ Errore nel leggere il file locale")
    else:
        print("Hai scelto di non ricaricare il Pokemon")
else:
    print("❌ Pokemon inesistente")











'''p1_data = PokemonReader().request(25)
if p1_data:
    p1 = Creature(**p1_data)
    # print(p1)
    createJson(p1)

readJson("pikachu")'''
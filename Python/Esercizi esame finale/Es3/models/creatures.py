import requests

#§ Questa classe 'Creature' serve a mappare i dati grezzi che arrivano dall'API 'pokeapi'
class Creature:
    id: int
    name: str
    height: int
    weight: int
    types: list[str]
    stats: dict[str, int]

    #^ Cotruttore
    def __init__(self, **data_dict):
        self.id = data_dict.get("id")
        self.name = data_dict.get("name")
        self.height = data_dict.get("height")
        self.weight = data_dict.get("weight")
        self.types = data_dict.get("types")
        self.stats = data_dict.get("stats")

    def __str__(self):
        return f"Caratteristiche del Pokemon '{self.name.capitalize()}': \n ID: {self.id} \n Name: {self.name} \n Height: {self.height} \n Weight: {self.weight} \n Types: {self.types} \n Stats: {self.stats}"
        
    #^ Metodo che crea il dizzionario del Pokemon
    def to_dict(self) -> dict:
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
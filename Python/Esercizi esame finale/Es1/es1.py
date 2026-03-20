
#§ Questa classe 'Libro' definisce l'oggetto base
class Libro:
    #^ Costruttore
    def __init__(self, titolo, autore, casaEditrice, prezzo):
        self.titolo = titolo
        self.autore = autore
        self.casaEditrice = casaEditrice
        self.__prezzo = prezzo      #? Attributo privato
    
    #^ Getter e Setter per l'attributo privato 'prezzo'
    def get_prezzo(self):
        return self.__prezzo
    
    def set_prezzo(self, prezzo):
        self.__prezzo = prezzo
    

#§ Questa classe 'Catalogo' stabilisce una collezzione di oggetti 'Libro'
class Catalogo:
    #^ Costruttore
    def __init__(self, nome, descrizione):
        self.nome = nome
        self.descrizione = descrizione
        self.lista = []
        self.__valTot = 0           #? Attributo privato

    #^ Getter e Setter per l'attributo privato 'valTot'
    def get_valTot(self):
        print(f"💵 Il valore totale di '{self.nome}' e di: €{self.__valTot}")
        return self.__valTot

    def set_valTot(self):
        totale = 0
        for libro in self.lista:
            totale += libro.get_prezzo()
        self.__valTot = totale

    #* Metodi per gestire la lista

    #^ Metodo 'add' serve per aggiungere un oggetto 'Libro' dalla lista 'Catalogo'
    def add(self, libro):
        self.lista.append(libro)
        self.set_valTot()
    
    #^ Metodo 'remove' serve per rimuovere un oggetto 'Libro' dalla lista 'Catalogo'
    def remove(self, libro):
        if libro in self.lista:
            self.lista.remove(libro)
            self.set_valTot()
        else:
            print("Libro non presente nella catalogo")

    #^ Metodo 'viewList' per visualizzare i libri dentro la lista 'Catalogo'
    def viewList(self):
        print(f"Catalogo: {self.nome}")
        for libro in self.lista:
            print(f" - Libro: {libro.titolo} - Autore: {libro.autore} - Prezzo: {libro.get_prezzo()}€")


    #* Metodi speciali

    #^ Metodo '__eq__' serve per controllare se 2 liste/Cataloghi, sono uguali o meno
    def __eq__(self, other):
        if isinstance(other, Catalogo):
            if self.nome == other.nome and self.descrizione == other.descrizione:
                print(f"✅ '{self.nome}' e '{other.nome}' sono cataloghi uguali")
                return True
            else:
                print(f"❌ '{self.nome}' e '{other.nome}' sono cataloghi differenti")
                return False
        else:
            print("Oggetti apparteneti a categorie differenti")

    #^ Metodo '__add__' serve per unire 2 liste/Cataloghi in una sola, creandone una nuova
    def __add__(self, other):
        if(isinstance(other, Catalogo)):
            nuovoCatalogo = Catalogo(self.nome + other.nome, self.descrizione + " e " + other.descrizione)
            nuovoCatalogo.lista = self.lista + other.lista
            nuovoCatalogo.set_valTot()
            return nuovoCatalogo
        else: 
            print("ERRORE")
            return None

    
# ln = Libro("nome_libro", "casa_editrice", prezzo)
# cn = Catalogo("nome_catalogo", "descrizione_catalogo")


#& Qui creiamo dei libri
l1 = Libro("Metro 2033", "Dimitri", "Luciani", 15.99)
l2 = Libro("Metro 2034", "Dimitri", "Luciani", 15.99)
l3 = Libro("Metro 2035", "Dimitri", "Luciani", 15.99)

l4 = Libro("Heartstopper 1", "Alice", "Oscar srl", 9.99)
l5 = Libro("Heartstopper 2", "Alice", "Oscar srl", 9.99)
l6 = Libro("Heartstopper 3", "Alice", "Oscar srl", 9.99)
l7 = Libro("Heartstopper 4", "Alice", "Oscar srl", 9.99)
l8 = Libro("Heartstopper 5", "Alice", "Oscar srl", 9.99)
l9 = Libro("Heartstopper 6", "Alice", "Oscar srl", 9.99)

#& Qui creiamo deli Cataloghi
c1 = Catalogo("Metro Collection", "La collezzioni di tutti i libri metro")
c2 = Catalogo("Metro Collection", "La collezzioni di tutti i libri metro")

c3 = Catalogo("Heartstopper Collection 1", "La collezzioni dei primi 3 libri di Heartstopper")
c4 = Catalogo("Heartstopper Collection 2", "La collezzioni dei ultimi 3 libri di Heartstopper")

#? Come prima cosa aggiungiali i libri 'l1, l2, l3' al Catalogho 'c1'
c1.add(l1)
c1.add(l2)
c1.add(l3)

#? Ora visualiziamo la lista 'c1'
c1.viewList()

#? Ora rimuoviamo il libro 'l2' dal Catalogho 'c1'
c1.remove(l2)

#? Visualiziamo di nuovo il Catalogho 'c1' per vedere se il libro l2 e stato rimosso con successo
c1.viewList()

#? Ora visualizziamo il prezzo totale del Catalogho
c1.get_valTot()

#§ __eq__
#? Controlliamo se i Cataloghi 'c1, c2, c3' sono uguiali o meno
print(c1 == c2)
print(c1 == c3)

#? Aggiungiamo i libri 'l4 .... l9' ai Cataloghi 'c3 e c4'
c3.add(l4)
c3.add(l5)
c3.add(l6)
c4.add(l7)
c4.add(l8)
c4.add(l9)

#§ __add__
#? Uniamo i cataloghi 'c3 e c4' in un nuovo Catlogho 'c5'
c5 = c3 + c4

#? Ora visualiziamo il Catalogho appena creato
c5.viewList()
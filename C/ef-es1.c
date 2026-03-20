#include <stdio.h>

void BMI(){
    float height; //Altezza
    float weight; //Peso
    float bmi;

    //Inserimento dati utente e il controllo se i dati inseriti sono corretti
    printf("\nInserira la propria altezza (in m): ");
    scanf("%f", &height);
    if (height <= 0.3){
        printf("\nALTEZZA NON CONFORME\n\n");
        return;
    }

    printf("\nInserire il proprio peso (in Kg): ");
    scanf("%f", &weight);
    if (weight <= 0){
        printf("\nPESO NON CONFORME\n\n");
        return;
    }

    //Calcolo BMI
    bmi = weight / (height * height);

    //Vedere in base al proprio BMI in quale categoria si rientra
    if (bmi < 18.50){
        printf("\nSOTTOPESO\n");
        printf("Il rischio di malattie associate e': BASSO, ma aumenta il rischio di altre patologie\n\n");
    } else if (bmi >= 18.50 && bmi <= 24.99){
        printf("\nINTERVALLO NORMALE\n");
        printf("Il rischio di malattie associate e': MEDIO\n\n");
    } else if (bmi >= 25){
        if (bmi >= 25 && bmi <= 29.99){
            printf("\nSOVRAPESO, categoria: PREOBESO\n");
            printf("Il rischio di malattie associate e': AUMENTATO\n\n");
        } else if (bmi >= 30 && bmi <= 34.99){
            printf("\nSOVRAPESO, categoria: OBESO CLASSE I\n");
            printf("Il rischio di malattie associate e': MODERATO\n\n");
        } else if (bmi >= 35 && bmi <= 39.99){
            printf("\nSOVRAPESO, categoria: OBESO CLASSE II\n");
            printf("Il rischio di malattie associate e': GRAVE\n\n");
        } else if (bmi >= 40){
            printf("\nSOVRAPESO, categoria: OBESO CLASSE III\n");
            printf("Il rischio di malattie associate e': MOLTO GRAVE\n\n");
        }
        
    } else{
        printf("Errore del BMI");
    }   
}



void fab_ene_kcal_1(){
    int gender;     //Sesso
    float weight;   //Peso
    float kcal;

    //Inserimento dati utente e il controllo se i dati inseriti sono corretti
    printf("\nInserire il proprio sesso:\n1-Uomo\n2-Donna\n");
    scanf("%d", &gender);
    if (gender != 1 && gender != 2){
        printf("\nSESSO NON CONFORME\n\n");
        return;
    }

    printf("\nInserire il proprio peso (in Kg): ");
    scanf("%f", &weight);
    if (weight <= 0){
        printf("\nPESO NON CONFORME\n\n");
        return;
    }
    

    //Calcolo del fabbisogno energetico espresso in kcal
    if (gender == 1){
        kcal = weight * 33;
        printf("\nIl suo fabbisogno energetico in 'kcal' e': %.2f\n\n", kcal);
    } else if (gender == 2){
        kcal = weight * 31;
        printf("\nIl suo fabbisogno energetico in 'kcal' e': %.2f\n\n", kcal);
    }
}



void fab_ene_kcal_2(){
    int gender;         //Sesso
    int age;            //Età
    float height;       //Altezza
    float weight;       //Peso
    float kcal;

    //Inserimento dati utente e il controllo se i dati inseriti sono corretti
    printf("\nInserire il proprio sesso:\n1-Uomo\n2-Donna\n");
    scanf("%d", &gender);
    if (gender != 1 && gender != 2){
        printf("\nSESSO NON CONFORME\n\n");
        return;
    }

    printf("\nInserire la prorpia eta': ");
    scanf("%d", &age);
    if (age >= 115 || age <= 0){
        printf("ETA NON CONFORME");
    }

    printf("\nInserira la propria altezza (in cm): ");
    scanf("%f", &height);
        if (height <= 40){
        printf("\nALTEZZA NON CONFORME\n\n");
        return;
    }

    printf("\nInserire il proprio peso (in Kg): ");
    scanf("%f", &weight);
    if (weight <= 0){
        printf("\nPESO NON CONFORME\n\n");
        return;
    }
    

    height = height / 100;  //Per trasformare l'altezza da 'm' in 'cm'

    //Calcolo del fabbisogno energetico espresso in kcal
    if (gender == 1){
        kcal = (10 * weight + 6.25 * height - 5 * age + 5) * 1.30;
        printf("\nIl suo fabbisogno energetico in 'kcal' e': %.2f\n\n", kcal);
    } else if (gender == 2){
        kcal = (10 * weight + 6.25 * height - 5 * age - 161) * 1.30;
        printf("\nIl suo fabbisogno energetico in 'kcal' e': %.2f\n\n", kcal);
    }
    
}



void fab_ene_kcal_conf(){
    int gender;         //Sesso
    int age;            //Età
    float height;      //Altezza
    float weight;         //Peso
    float kcal1;        
    float kcal2;
    float kcal_dif;


    //Inserimento dati utente e il controllo se i dati inseriti sono corretti
    printf("\nInserire il proprio sesso:\n1-Uomo\n2-Donna\n");
    scanf("%d", &gender);
    if (gender != 1 && gender != 2){
        printf("\nSESSO NON CONFORME\n\n");
        return;
    }

    printf("\nInserire la prorpia eta': ");
    scanf("%d", &age);
    if (age >= 115 || age <= 0){
        printf("ETA NON CONFORME");
    }

    printf("\nInserira la propria altezza (in m): ");
    scanf("%f", &height);
        if (height <= 0.3){
        printf("\nALTEZZA NON CONFORME\n\n");
        return;
    }

    printf("\nInserire il proprio peso (in Kg): ");
    scanf("%f", &weight);
    if (weight <= 0){
        printf("\nPESO NON CONFORME\n\n");
        return;
    }


    //Calcolo del fabisogno energetico con la prima formula
    if (gender == 1){
        kcal1 = weight * 33;
    } else if (gender == 2){
        kcal1 = weight * 31;
    }

    //Calcolo del fabisogno energetico con la seconda formula
    if (gender == 1){
        kcal2 = (10 * weight + 6.25 * height - 5 * age + 5) * 1.30;
    } else if (gender == 2){
        kcal2 = (10 * weight + 6.25 * height - 5 * age - 161) * 1.30;
    }

    //Calcolo la loro differenza
    if (kcal1 > kcal2){
        kcal_dif = kcal1 - kcal2;
    } else{
        kcal_dif = kcal2 - kcal1;
    }

    //Stampiamo il confronto
    printf("\nUsando la prima formula si ottiene: %.2f", kcal1);
    printf("\nUsando la seconda formula si ottiene: %.2f", kcal2);
    printf("\nLa loro differenza e di: %.2f\n\n", kcal_dif);

}



int main(){
    int scelta;

    do{
        printf("Benvenuto, selezionare quale:\n0-Uscita\n1-BMI\n2-Fabisogno energetico in kcal 1.0\n3-Fabisogno energetico in kcal 2.0\n4-Confornto tra il fabisogno energetico 1 e il fabisogno energetico 2\n");
        scanf("%d", &scelta);

        switch (scelta){
        case 1:
            BMI();
            break;

        case 2:
            fab_ene_kcal_1();
            break;

        case 3:
            fab_ene_kcal_2();
            break;

        case 4:
            fab_ene_kcal_conf();
            break;
        
        default:
            break;
        }
        
    } while (scelta != 0);
    

}
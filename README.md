# Project Pharmacy

## First step : download the repo
Download the repo. After that, open the folder of the repo with vs code.
Then press <span style="color: lightblue;">CTRL + J</span> or <span style="color: lightblue;">Windows + J</span> to open a terminal inside the project.

## Second step : install docker container
For the first running, you need to have docker installed.<br>
Then, from your command line, run <code style="color: lightblue;">docker build -t truffle-dev .</code>

## run bash from the container
Run this command in your terminal<br>
<p>For Unix os</p>
<p><code style="color: lightblue;">docker run -it -p 7545:7545 -v $(pwd):/usr/src/app truffle-dev</code>

<p>For Windows os</p>
<p><code style="color: lightblue;">docker run -it -p 7545:7545 -v cd:/usr/src/app truffle-dev</code>

<p >Congrats !! Now you have access to command line. You can compile and mitigate your code.</p>

## <span style="color: red;">WARNING<span>
For <span style="color: lightblue;">truffle mitigate</span> to work, you should first open <span style="color: orange;">Ganache</span> on port 7545.


## Notes for the project
- Φτιάχνουμε σύστημα ιχνηλάτησης φαρμακευτικών προϊόντων

## Σταθμοί - Που βρίσκεται το προϊόν
- Προμηθευτής
- Μεταφορική
- Κατασκευαστής
- Αποθήκη Logistic
- Διανομέας
- Φαρμακαποθήκη

## 4 χρήστες
1. Διαχειριστής
    - με δυνατότητα προσθήκης ή αφαίρεσης συμμετεχόντων
2. Προμηθευτής
    - δυνατότητα προβολής της κατάστασης των προϊόντων μέχρι τον κατασκευαστή δηλαδή τρέχουσα θέση, ποσότητα, στοιχεία αποστολής
3. Υπάλληλος-Logistic
    - πρόσβαση σε όλες τις πληροφορίες μέχρι την αποθήκη Logistic
4. Ελεγκτής
    - πρόσβαση σε όλες τις πληροφορίες


## Προϊόντα
- θέλουμε αντικείμενα "προϊόντα"
- 10 στην αρχή του project + πληροφορίες

## Σημείωση
Η εφαρμογή σας θα πρέπει να επιτρέπει προσθήκη, ενημέρωση προϊόντων καθώς και ερωτήματα για τα προϊόντα (θέση, ποσότητα, κτλ.) ανάλογα με το επίπεδο πρόσβασης του κάθε χρήστη.

## Structs
- Role of Users
- Products
- Shipment

## Οντότητες - Σταθμοί
 - λίστα με τουε σταθμούς


# Structures

## User
- id
- role
- name

# Product
- id
- name


# Shipment


# Products
Πάμε με την λογική ότι κάθε προϊόν είναι ένα πακέτο με ένα συγκεκριμένο προϊόν σε κ΄ποια ποσότητα
π.χ. ένα κουτί που έχει 100 depon μέσα.
Αν θέλει ο χρήστης να φτιάξει νέο πακέτο με depon έχει την δυνατότητα αλλά το 2ο πακέτο δεν έχει σχέση με το πρώτο.

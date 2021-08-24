console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");

class Book {
    constructor(id,title,author,read){
        this.id = id;
        this.title =title;
        this.author = author;
        this.read = read;

    }

}


class Library {
    constructor(bookcount = 0, books=[]){
        this.bookcount = bookcount;
        this.books = books;
        this.globalID=0;
    }

    markRead(id){
        for(var i=0;i<this.books.length;){
            if(id == this.books[i].id){
                console.log("id found!! checking the boxes");
                console.log("the book in question");
                console.log(this.books[i]);
                this.books[i].read=true;
            }

            
            //set checkbox to checked attribute
            //set checkbox to disabled
            // what calls this function?
            ++i;
        }
        var incheck = document.getElementById("Slot-"+String(id)+"-incheck");
        incheck.checked = "on";
        incheck.disabled = "on" ;
    }

    addBook() {
        var newtitle = document.getElementById("titleinput").value;
        var newauthor = document.getElementById("authorinput").value;
        var newread = document.getElementById("readinput").checked;
        document.getElementById("titleinput").value = "";
        document.getElementById("authorinput").value = "";
        document.getElementById("readinput").checked = "";
        var currentid= this.globalID;
        var newbook= new Book(currentid,newtitle,newauthor,newread);
        this.books.push(newbook);
        this.globalID += 1;
        this.bookcount += 1;
        console.log(`this.globalID: ${this.globalID}`)
        console.log("this.books: ");
        console.log(this.books);



        var tablebody = document.getElementById("fullLibTable");
        console.log("tbody")
        console.log(tablebody)

        var tdtitle = document.createElement("td");
        tdtitle.innerHTML = newtitle;
        tdtitle.id = "Slot-" + String(currentid) + "-tdtitle"

        var tdauthor = document.createElement("td");
        tdauthor.innerHTML = newauthor
        tdauthor.id = "Slot-" + String(currentid) + "-tdauthor"

        var incheck = document.createElement("input");
        incheck.type = "checkbox";
        incheck.name = "read";
        //incheck.id= "readLibraryCheckbox";
        incheck.id = "Slot-" + String(currentid) + "-incheck"
        console.log(`newread value: -${newread}-`)
        if(newread){
            console.log("newread is not empty meaning checked")
            incheck.checked = "on";
            incheck.disabled = "on";
        }else{
            console.log("newread is empty meaning unchecked")
            incheck.addEventListener("click",function(){callLibraryMarkRead(currentid);});
        }
        

        var tdcheck = document.createElement("td");
        tdcheck.appendChild(incheck);
        tdcheck.id = "Slot-" + String(currentid) + "-tdcheck"

        var inremove = document.createElement("input");
        inremove.type = "submit";
        inremove.value = "REMOVE!!!";
        inremove.id = "goodfornow";
        inremove.addEventListener("click",function(){callLibraryRemoveBook(currentid);});

        var tdremove = document.createElement("td");
        tdremove.appendChild(inremove);
        tdremove.id = "Slot-" + String(currentid) + "-tdRemove"

        var newrow = document.createElement("tr");
        newrow.id = "Slot-" +String(currentid)
        newrow.appendChild(tdtitle);
        newrow.appendChild(tdauthor);
        newrow.appendChild(tdcheck);
        newrow.appendChild(tdremove);

        tablebody.appendChild(newrow);

    }

    removeBook(id){
        console.log("inside remove book")
        var found = null;
        for(var i =0; i<this.books.length;){
            if(this.books[i].id == id){
                console.log(`i: ${i}`)
                found = i;
            }
            ++i;
        }
        this.books.splice(found,1);

        var tr_slot_id = "Slot-" +String(id); 
        var tr_remove = document.getElementById(tr_slot_id);
        var tablebody = document.getElementById("fullLibTable");
        tablebody.removeChild(tr_remove);

        this.bookcount -=1;


    }
    


    

}


function callLibraryAddBook(){
    theLIB.addBook();

    console.log("the current the lib after add");
    console.log(theLIB);

}

function callLibraryRemoveBook(id){
    theLIB.removeBook(id);
    console.log("the current the lib after remove");
    console.log(theLIB);
}

function callLibraryMarkRead(id){
    console.log("in side of lib mark read")
    theLIB.markRead(id)


}
let globalID =0;
let theLIB = new Library();

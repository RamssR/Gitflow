var obj = [{
        "name": "Vishnu",
        "mobilenumber": 9876543210,
        "dob": "2012-09-08",
        "email": "vvvv@gmail.com",
        "address": "23,raja street,Chennai",
        "state": "Tamil Nadu"
    },
    {
        "name": "Suba",
        "mobilenumber": 9123453210,
        "dob": "1978-09-07",
        "email": "suba@gmail.com",
        "address": "13,sasis street,Banglore",
        "state": "Karnataka"
    },
    {
        "name": "Ramya",
        "mobilenumber": 8856543210,
        "dob": "1997-04-12",
        "email": "ramya@gmail.com",
        "address": "25,derf street,Chennai",
        "state": "Tamil Nadu"
    }
];
var flag = 1;
var contact =  (function () {
    function contact() {
    }
    contact.prototype.validation1 = function () {
        var name = document.getElementById("name").value;
        var mobile = document.getElementById("mobilenumber").value;
        var email = document.getElementById("email").value;
        if ((name == "") || (mobile == "")) {
            alert("Please fill the mandatory fields");
            return false;
        }
        if (mobile.length != 10) {
            alert("Invalid number, it should contain 10 digits");
            return false;
        }
        if (email.length != 0 && email.indexOf("@", 0) < 0) {
            window.alert("Please enter a valid e-mail address.");
            return false;
        }
        if (email.length != 0 && email.indexOf(".", 0) < 0) {
            window.alert("Please enter a valid e-mail address.");
            return false;
        }
        return true;
    };
    contact.prototype.addRow = function () {
        document.getElementById("submit").style.visibility = "visible";
        document.getElementById("clear").style.visibility = "visible";
        document.getElementById("update").style.visibility = "hidden";
        document.getElementById("cancel").style.visibility = "hidden";
        var result;
        result = this.validation1();
        if (result) {
            var name = document.getElementById("name").value;
            var mobile = document.getElementById("mobilenumber").value;
            var dob = document.getElementById("dob").value;
            var email = document.getElementById("email").value;
            var address = document.getElementById("address").value;
            var state = document.getElementById("state").value;
            obj.push({
                "name": name, "mobilenumber": mobile, "dob": dob, "email": email, "address": address,
                "state": state
            });
            flag = 1;
            this.record();
            this.clear();
        }
    };
    contact.prototype.record = function () {
        var table = document.getElementById("table");
        var tbody = document.getElementById("tbody");
        for (var k = 1; k < table.rows.length; k++) {
            table.deleteRow(1);
            k = 0;
        }
        for (var i = 0; i < obj.length; i++) {
            var tr = document.createElement("tr");
            for (var key in obj[i]) {
                var td = document.createElement("td");
                var txt = document.createTextNode(obj[i][key]);
                td.appendChild(txt);
                tr.appendChild(td);
            }
            var td = document.createElement("td");
            var del = document.createElement("button");
            var txt = document.createTextNode("Delete");
            del.appendChild(txt);
            del.value = "delete";
            del.id = "delete" + flag;
            flag = flag + 1;
            del.onclick = deleteRows;
            td.appendChild(del);
            tr.appendChild(td);
            var td = document.createElement("td");
            var edi = document.createElement("button");
            var txt = document.createTextNode("Edit");
            edi.appendChild(txt);
            edi.value = "edit";
            edi.onclick = editRow;
            td.appendChild(edi);
            tr.appendChild(td);
            tbody.appendChild(tr);
            table.appendChild(tr);
        }
    };
    contact.prototype.clear = function () {
        document.getElementById("submit").style.visibility = "visible";
        document.getElementById("clear").style.visibility = "visible";
        document.getElementById("update").style.visibility = "hidden";
        document.getElementById("cancel").style.visibility = "hidden";
        document.getElementById("name").value = "";
        document.getElementById("mobilenumber").value = "";
        document.getElementById("dob").value = "";
        document.getElementById("email").value = "";
        document.getElementById("address").value = "";
        document.getElementById("state").value = "";
        for (var i = flag - 1; i > 0; i--) {
            var d = document.getElementById("delete" + i);
            d.disabled = false;
        }
    };
    return contact;
}());
var contactObj = new contact();
function deleteRows() {
    if (confirm("Do you want to delete the record?")) {
        var table = document.getElementById("table");
        for (var j = 0; j < table.rows.length; j++) {
            table.rows[j].cells[6].onclick = function () {
                var index = this.parentElement.rowIndex;
                console.log(index);
                obj.splice(index - 1, 1);
                flag = 1;
                contactObj.record();
            };
        }
    }
}
function editRow() {
    var table = document.getElementById("table");
    for (var k = flag - 1; k > 0; k--) {
        var d = document.getElementById("delete" + k);
        d.disabled = true;
    }
    document.getElementById("update").style.visibility = "visible";
    document.getElementById("cancel").style.visibility = "visible";
    document.getElementById("submit").style.visibility = "hidden";
    document.getElementById("clear").style.visibility = "hidden";
    for (var u = 0; u < table.rows.length; u++) {
        table.rows[u].cells[7].onclick = function () {
            var rindex = this.parentElement.rowIndex;
            document.getElementById("name").value = table.rows[rindex].cells[0].innerHTML;
            document.getElementById("mobilenumber").value = table.rows[rindex].cells[1].innerHTML;
            document.getElementById("dob").value = table.rows[rindex].cells[2].innerHTML;
            document.getElementById("email").value = table.rows[rindex].cells[3].innerHTML;
            document.getElementById("address").value = table.rows[rindex].cells[4].innerHTML;
            document.getElementById("state").value = table.rows[rindex].cells[5].innerHTML;
            var e = document.getElementById("update");
            e.onclick = function () {
                obj.splice(rindex - 1, 1);
                contactObj.addRow();
                for (var i = flag - 1; i > 0; i--) {
                    var d = document.getElementById("delete" + i);
                    d.disabled = false;
                }
            };
        };
    }
}
function main(id) {
    contactObj.record();
    if (id == "submit")
        contactObj.addRow();
    else if (id == "clear")
        contactObj.clear();
    else
        contactObj.clear();
}

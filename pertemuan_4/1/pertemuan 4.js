//declarative function
function foobar(param1, param2) {
}

//declaration anonymous function
const foobar = function(param1, param2) {
}

//pemanggilan function
foobar("abc", 123, "etc");

//arrow function
const foobar = (param1, param2) => {
}

//pemanggilan function
foobar("abc", 123, "etc");

//arrow function dengan return
const penjumlahan = (param1, param2) => param1 + param2;

//setara dengan
function penjumlahan(param1, param2) {
    return param1 + param2;
}
//clousure de funcion

(()=>{
    setTimeout(() => {

    let errors = document.querySelectorAll(".alert");
    errors.forEach(function(element){element.parentNode.removeChild(element)});
    
}, 3500);

})();


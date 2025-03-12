// Lidar com o envio do formulário de frete
document.getElementById('formFrete').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário padrão
  
    var cep = document.getElementById('cep').value.trim();
    var freteMessageDiv = document.getElementById('freteMessage');
    cep = cep.replace("-", "");
  
    if (cep.length === 8 && !isNaN(cep)) { // Verifica se o CEP tem 8 caracteres e é numérico
      fetch(`https://viacep.com.br/ws/${cep}/json/`) 
        .then(response => response.json())
        .then(data => {
          if (data.uf === "GO") {
            freteMessageDiv.innerHTML = "<p><strong>Frete grátis!</strong> O CEP informado é de Goiás.</p>";
          } else if (data.uf === "SP"){
            freteMessageDiv.innerHTML = "O frete é 10 reais";
          } else {
            freteMessageDiv.innerHTML = "<p>Infelizmente, o frete grátis não está disponível para o seu CEP.</p>";
          }
        })
        .catch(error => {
          freteMessageDiv.innerHTML = "<p>Não foi possível verificar o CEP. Tente novamente mais tarde.</p>";
        });
    } else {
      freteMessageDiv.innerHTML = "<p>Por favor, insira um CEP válido com 8 números.</p>";
    }
  });
  


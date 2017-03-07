angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http, contatosAPI) {
  $scope.app = "Lista Telefonica";
  $scope.contatos = [];
  $scope.operadoras = [];

  var carregarContatos = function () {

    contatosAPI.getContatos().then(function successCallback(response) {
        $scope.contatos = response.data;
      },  function errorCallback(response) {
        $scope.message = "Aconteceu um problema: " + response;
    });

  };

  //carregarContatos()
  console.log($scope.contatos)


  var carregarOperadoras = function () {
    $http({
      method : "GET",
      url : 'http://localhost:3412/operadoras'
    }).then(function successCallback(response) {
        $scope.operadoras = response.data;
      },  function errorCallback(response) {
        $scope.message = "Aconteceu um problema: " + response;
    });
  };


  console.log($scope.operadoras);

  $scope.adicionarContato = function (contato) {
    contato.data = new Date();
    $http.post("http://localhost:3412/contatos", contato).success(function (data) {
      delete $scope.contato;
      $scope.contatoForm.$setPristine();
      carregarContatos();
    });
  };
  $scope.apagarContatos = function (contatos) {
    $scope.contatos = contatos.filter(function (contato) {
      if (!contato.selecionado) return contato;
    });
  };
  $scope.adicionarContato = function (contato) {
    $scope.contatos.push(angular.copy(contato));
    delete $scope.contato;
    $scope.contatoForm.$setPristine();
  };
  $scope.apagarContatos = function (contatos) {
    $scope.contatos = contatos.filter(function (contato) {
      if (!contato.selecionado) return contato;
    });
  };
  $scope.isContatoSelecionado = function (contatos) {
    return contatos.some(function (contato) {
      return contato.selecionado;
    });
  };
  $scope.ordenarPor = function (campo) {
    $scope.criterioDeOrdenacao = campo;
    $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
  };

  carregarContatos();
  carregarOperadoras();

});

export default class Util {

  static getUrl() {
      return 'http://localhost:8081';
  }

  static successMessage(){
    return 'Foram encontrados alguns registros que estão exibidos a seguir.'
  }

  static errorNotFound(){
    return 'Não foram encontrados registros para a solicitação.'
  }

  static successSaveMessage(){
    return 'Registro salvo com sucesso.'
  }

  static errorSaveMessage(){
    return 'Houve um problema com sua requisição. Tente novamente mais tarde.'
  }

  static errorInvalidPassword(){
    return 'As senhas digitadas não coincidem. Gentileza, corrigir os campos: Senha e Confirma Senha.'
  }

  static errorInvalidCredentials(){
    return 'Login ou senha incorretos.'
  }

  static dataDeleted(){
    return 'Informação deletada com sucesso.'
  }

}

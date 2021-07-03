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

}

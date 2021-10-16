const { italic } = require('chalk');
const pegaArquivo = require('../index');

const arrayResult = [
    {
        FileList: [ 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList' ]
    }
]

describe('pegaArquivo::', () => {
    it('deve ser uma função', () => {
        expect(typeof pegaArquivo).toBe('function')
    })
    it('deve retornar array com resultados', async () => {
        const resultado = await pegaArquivo('./test/arquivos/texto1.md')
        expect(resultado).toEqual(arrayResult)
    })
    it('deve retornar mensagem "Não há links"', async () => {
        const resultado = await pegaArquivo('./test/arquivos/texto1_semlinks.md')
        expect(resultado).toBe('Não há links')
    })
    it('deve retornar um erro na falta de arquivo', () => {
        async function capturaErro() {
            await pegaArquivo('./test/arquivos/')
        expect(capturaErro).toThrowError(/Arquivo não encontrado/)
        }
    })
})
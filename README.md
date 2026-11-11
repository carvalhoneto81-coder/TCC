# Inspeciona Civil — TCC

Aplicação web progressiva para registro acadêmico de inspeções visuais, baseada no instrumento preliminar do projeto de TCC.

**Estado:** protótipo experimental 0.1.6. Sujeito à validação do orientador e a teste em campo. Não é ferramenta de diagnóstico estrutural, perícia ou prescrição de reparos.

- [Abrir aplicativo](./inspeciona-civil/)
- [Guia de instalação e backup](./inspeciona-civil/ajuda.html)

## Privacidade

O código e a interface são públicos neste repositório. Os dados preenchidos, fichas e fotografias são armazenados localmente no navegador do dispositivo. Esta versão não envia os registros para este repositório nem oferece sincronização em nuvem. Exporte backups JSON e ZIP regularmente e mantenha-os em local restrito.

Não cadastre dados pessoais de moradores, trabalhadores ou terceiros. O aplicativo não solicita GPS.

## Cadastro e acervo (0.1.6)

- A.1 distingue reconhecimento exploratório, piloto e coleta da pesquisa. Exploratório e piloto não exibem indicadores da amostra.
- Total de unidades e quantidade elegível são separados. Vistorias realizadas são contadas a partir de A.2. Textos antigos no campo numérico ficam preservados para conferência.
- A.1 permite registrar fontes, pendências e fotos do empreendimento sem criar ocorrências. Fotografias de ocorrências permanecem em A.4.
- Backup JSON v1 mantém os campos adicionais, pendências e fotos. A importação valida todos os registros antes de gravar em uma única transação. ZIP inclui fotos, fontes e pendências.
- Não há importação automática de dados ou imagens do Marista nem envio para a hospedagem.

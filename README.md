# RPDO Token - Ethereum ERC20 Token

Este projeto implementa um token ERC20 padrão na rede Ethereum usando Solidity. O nome do token é **RPDO Token** e seu símbolo é **RPDO**. Este contrato inteligente foi desenvolvido como parte de um desafio de um bootcamp, cujo objetivo é criar uma criptomoeda simples na rede Ethereum.

## Descrição do contrato

O contrato RPDO Token é um contrato inteligente que segue o padrão **ERC20**, amplamente utilizado para criar tokens fungíveis na blockchain Ethereum. Os tokens ERC20 são ideais para criar sistemas de pagamento, recompensas, ou qualquer aplicação que exija um ativo digital intercambiável.

### Componentes do contrato

1. **Nome e símbolo**:
    - O token tem o nome "RPDO Token" e o símbolo "RPDO".
    - Esses atributos são definidos no construtor e herdados da implementação do padrão ERC20 da biblioteca OpenZeppelin.

2. **Suprimento inicial**:
    - O contrato aceita um parâmetro chamado `initialSupply`, que define o suprimento inicial de tokens a serem criados quando o contrato é implantado.
    - Esse valor é especificado no momento do deploy, e a quantidade de tokens é automaticamente alocada ao endereço que implanta o contrato (o `msg.sender`).

3. **Função de minting**:
    - No momento da implantação do contrato, o método `_mint` é utilizado para criar o número inicial de tokens e atribuí-los à carteira que executou o deploy. Isso garante que o criador do contrato tenha o total controle do suprimento inicial.

4. **Herança de OpenZeppelin**:
    - O contrato herda as funcionalidades de um contrato ERC20 padrão da biblioteca OpenZeppelin, o que simplifica o desenvolvimento e garante segurança e conformidade com o padrão ERC20.
    - Funções como transferência de tokens, consulta de saldo, aprovação de transferências e transferência de tokens em nome de outro usuário são automaticamente implementadas.

## Ferramentas e tecnologias utilizadas

- **Solidity**: Linguagem de programação usada para escrever contratos inteligentes.
- **Hardhat**: Framework de desenvolvimento para Ethereum que facilita a compilação, deploy e testes de contratos.
- **OpenZeppelin**: Biblioteca de contratos inteligentes para Ethereum que fornece implementações seguras de padrões, como ERC20.
- **Node.js**: Ambiente JavaScript que suporta as ferramentas necessárias, como Hardhat.
- **Ethers.js**: Biblioteca para interagir com a blockchain Ethereum e os contratos inteligentes.
- **Metamask**: Extensão de navegador para gerenciar carteiras Ethereum e interagir com a blockchain.

## Como executar e testar o projeto

### Passos para testar o tontrato localmente

1. **Instalar dependências**: Certifique-se de que possui Node.js instalado e use `npm install` para instalar as bibliotecas e ferramentas necessárias.

2. **Compilar o contrato**: Compile o contrato usando o comando do Hardhat `npx hardhat compile`, verificando se ele não contém erros e está pronto para ser implantado.

3. **Testar o contrato**: Testes são essenciais para verificar o comportamento do contrato, como a criação de tokens, transferências e checagem de saldos. Execute os testes com o comando `npx hardhat test` ou `npx hardhat coverage` para os testes de cobertura.

### Passos para realizar o reploy em uma Testnet

1. **Configurar uma rede de Testnet**: Use uma testnet, para facilitar o Hardhat fornece uma rede local, execute o comando `npx hardhat node` para executar uma rede local.

2. **Deploy do contrato**: O contrato pode ser implantado em uma rede de testes Ethereum, onde poderá ser interagido utilizando carteiras como Metamask e block explorers para monitorar as transações. Vamos utilizar a rede local do Hardhat para fins didáticos. Em outra aba do terminal execute o comando de deploy utilizando Hardhat Ignition `npx hardhat ignition deploy ./ignition/modules/RPDOToken.js --network localhost`.

3. **Interagir com o contrato**: Após o deploy, você poderá utilizar ferramentas como Ethers.js ou diretamente pela interface do Metamask para transferir tokens RPDO entre diferentes carteiras e realizar outras operações de teste.

## Considerações finais

O contrato RPDO Token foi criado como uma introdução prática ao desenvolvimento de tokens na Ethereum. Ele segue o padrão ERC20 para garantir interoperabilidade e segurança. Este projeto fornece uma base sólida para aprender e entender como os contratos inteligentes e tokens funcionam na blockchain Ethereum.

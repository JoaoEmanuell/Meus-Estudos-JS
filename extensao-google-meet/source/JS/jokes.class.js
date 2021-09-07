class jokes{
    constructor(){
        this.main();
    }
    main(){
        const quest = this.question();
        const answer = this.answers();
        const number = this.getNumber(quest);
        mensage(`${quest[number]}\n${answer[number]}`);
    }
    getNumber(list){
        return Math.floor(Math.random() * list.length);
    }
    question(){
        const quest = ['O que o pato disse para a pata?', 'Porque o menino estava falando no telefone deitado?'];
        return quest;
    }
    answers(){
        const answer = ['Vem Quá!', 'Para não cair a ligação!'];
        return answer;
    }
}
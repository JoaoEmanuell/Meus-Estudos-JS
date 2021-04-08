let amigo = {nome:'José',
 sexo:'M',
  peso:55.7,
engordar(p=0){
    console.log('Engordou')
    this.peso += p//this é um metodo que faz com que ele se referencie ao propio objeto
}}

amigo.engordar(2)
console.log(`${amigo.nome} pesa ${amigo.peso}`)
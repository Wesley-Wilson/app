const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
  value: "Chamar a isa pra sair",
  checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta: "})

  if(meta.length == 0) {
    console.log("A meta não pode ser vazia")
    return
  }

  metas.push(
    {value: meta, cheked: false}
  )
}

const listarMetas = async () => {
  const respostas = await checkbox({
    message: "Use *SETAS* para migrar entre metas, *ESPAÇO* para marcar ou desmarcar, *ENTER* para finalizar esta etapa",
    choices: [...metas],
    instructions: false,
  })
  if(respostas.lenght == 0) {
    console.log("Nenhuma meta selecionada!")
    return
  }

  metas.forEach((m) => {
    m.checked = false
  })

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })

    meta.checked = true
  })

  console.log("Meta(s) marcadas como concluída(s).")
}

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked
  })

  if(realizadas.length == 0) {
    console.log('Não existem metas realizadas! ')
    return
  }

  await select({
    message: "Metas Realizadas",
    choices: [...realizadas]
  })
}

const start = async () => {

    while(true){

      const opcao = await select({
        message: "Menu >",
        choices: [
          {
            name: "Cadastrar meta",
            value: "cadastrar"
          },
          {
            name: "Listar meta",
            value: "listar"
          },
          {
            name: "Metas realizadas",
            value: "realizadas"
          },
          {
            name: "Sair",
            value: "sair"
          }
        ]
      })


      switch(opcao) {
        case "cadastrar":
          await cadastrarMeta()
          console.log(metas)
          break
        case "listar":
          await listarMetas()
          break
        case "realizadas":
          await metasRealizadas()
          break
        case "sair":
          console.log("Obrigado por utilizar o Metas")
          return
      }
    }
}

start()

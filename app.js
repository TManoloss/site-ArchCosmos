const questionDisplay = document.querySelector('#questions')
const answerDisplay = document.querySelector('#answer')

const questions = [
  {
    id: 0,
    text: 'Qual seu prazo?:',
    answers: [
      {
        text: 'Curto',
        image: 'despertador.png'
      },
      {
        text: 'medio',
        image: 'despertador.png',
        alt: 'Time-lapse photography car lights on bridge'
      },
      {
        text: 'Longo',
        image: 'despertador.png',
        alt: 'High-rise buildings'
      },
      {
        text: 'Mais de 1 ano ',
        image: 'despertador.png',
        alt: 'Road with people and house'
      }
    ]
  },
  {
    id: 1,
    text: 'Qual tipo de jogo?:',
    answers: [
      {
        text: 'RPG',
        image:
          'https://images.wallpapersden.com/image/download/hellpoint-rpg-game_a21uaGWUmZqaraWkpJRmbm5prWZlbWU.jpg',
        alt: 'Pepperoni Pizza'
      },
      {
        text: 'FPS',
        image:
          'https://cdn.mos.cms.futurecdn.net/vQHKZ5GuwxatBQZnGfGiw4-320-80.jpg',
        alt: 'ham sandwich on white surface'
      },
      {
        text: 'FPA',
        image:
          'https://i.gadgets360cdn.com/large/resident_evil_4_remake_review_small_1679990387639.jpg',
        alt: 'Pasta in tomato sauce'
      },
      {
        text: 'VR',
        image:
          'https://www.taupo.info/sites/www.taupo.info/files/styles/list__smartport/public/pics/listings/images/virtual_reality_2.jpg?itok=RVWx3k3y',
        alt: 'hamburger'
      }
    ]
  },
  {
    id: 2,
    text: 'Escolha um estilo:',
    answers: [
      {
        text: 'Medieval',
        image:
          'https://images.wallpaperscraft.com/image/single/castle_walkway_architecture_157429_320x240.jpg',
        alt: 'focus photography of building windows',
        credit: 'Burgess Milner'
      },
      {
        text: 'Moderno ou conteporaneo',
        image:
          'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjczMTc0fQ&fit=crop&h=230&w=320&crop=edges',
        alt: 'low angle view of building'
      },
      {
        text: 'industrial',
        image:
          'https://4.bp.blogspot.com/_lyZvyGFRi0k/TH-_gQ1t8EI/AAAAAAAAE9A/lUk7LMYJPV0/s320/steampunk-landscape.jpg',
        alt: 'trees beside white house'
      },
      {
        text: 'High-Tech',
        image:
          'https://images.wallpapersden.com/image/download/cyberpunk-2077-game-poster_bGdla2yUmZqaraWkpJRoZ2WtZ2ll.jpg',
        alt: 'brown wooden cabin infront of forest'
      }
    ]
  }
]

const answers = [
  {
    combination: ['curto', 'Pizza', 'industrial'],
    text: 'Aline Custódio    alinecustma@archcosmos.com',
    image: 'aline.jpeg',
    alt: 'Blue cheese'
  },
  {
    combination: ['Austin', 'Pasta', 'Medieval'],
    text: 'Flávio Munir     flaviomunir@archcosmos.com',
    image: 'flavip.jpeg',
    alt: 'Cheddar cheese'
  },
  {
    combination: ['Portland', 'Sandwich', 'Moderno ou conteporaneo'],
    text: 'Isabelly Miaki e Luan do Carmo   isabellymiaki@archcosmos.com  luandocarmo@archcosmos.com',
    image: 'miakiEluan.jpeg',
    alt: 'Feta cheese'
  },
  {
    combination: ['New Orleans', 'Hamburger', 'High-Tech'],
    text: 'Sabrina Lísia     sabrinalisia@archcosmos.com',
    image: 'bina.jpeg',
    alt: 'Halloumi'
  }
]
// need to have a default answer to compensate for lack of combination data

const unansweredQuestions = []
const chosenAnswers = []

const populateQuestions = () => {
  questions.forEach(question => {
    const titleBlock = document.createElement('div')
    titleBlock.id = question.id
    titleBlock.classList.add('title-block')
    const titleHeading = document.createElement('h2')
    titleHeading.textContent = question.text
    titleBlock.append(titleHeading)
    questionDisplay.append(titleBlock)

    const answersBlock = document.createElement('div')
    answersBlock.id = question.id + '-questions'
    answersBlock.classList.add('answer-options')

    unansweredQuestions.push(question.id)

    question.answers.forEach(answer => {
      const answerBlock = document.createElement('div')
      answerBlock.classList.add('answer-block')
      answerBlock.addEventListener('click', () =>
        handleClick(question.id, answer.text)
      )
      const answerImage = document.createElement('img')
      answerImage.setAttribute('src', answer.image)
      answerImage.setAttribute('alt', answer.alt)

      const answerTitle = document.createElement('h3')
      answerTitle.textContent = answer.text

      const answerInfo = document.createElement('p')
      const imageLink = document.createElement('a')
      imageLink.setAttribute('href', answer.image)
      imageLink.textContent = answer.credit
      const sourceLink = document.createElement('a')
      sourceLink.textContent = 'Unsplash'
      sourceLink.setAttribute('src', 'https://www.unsplash.com')
      answerInfo.append(imageLink, ' to ', sourceLink)

      answerBlock.append(answerImage, answerTitle, answerInfo)

      answersBlock.append(answerBlock)
    })

    questionDisplay.append(answersBlock)
  })
}
populateQuestions()

const handleClick = (questionId, chosenAnswer) => {
  if (unansweredQuestions.includes(questionId)) chosenAnswers.push(chosenAnswer)
  const itemToRemove = unansweredQuestions.indexOf(questionId)

  if (itemToRemove > -1) {
    unansweredQuestions.splice(itemToRemove, 1)
  }
  console.log(chosenAnswers)
  console.log(unansweredQuestions)

  disableQuestionBlock(questionId, chosenAnswer)
  const lowestQuestionId = Math.min(...unansweredQuestions)
  location.href = '#' + lowestQuestionId

  if (!unansweredQuestions.length) {
    location.href = '#answer'
    showAnswer()
  }
}

const showAnswer = () => {
  let result
  answers.forEach(answer => {
    if (
      chosenAnswers.includes(answer.combination[0]) +
      chosenAnswers.includes(answer.combination[1]) +
      chosenAnswers.includes(answer.combination[2])
    ) {
      result = answer
      return
    } else if (!result) {
      //first answer object is default
      result = answers[0]
    }
  })

  const answerBlock = document.createElement('div')
  answerBlock.classList.add('result-block')
  const answerTitle = document.createElement('h3')
  answerTitle.textContent = result.text
  const answerImage = document.createElement('img')
  answerImage.setAttribute('src', result.image)
  answerImage.setAttribute('alt', result.alt)

  answerBlock.append(answerTitle, answerImage)

  answerDisplay.append(answerBlock)

  const allAnswerBlocks = document.querySelectorAll('.answer-block')
  Array.from(allAnswerBlocks).forEach(answerBlock =>
    answerBlock.replaceWith(answerBlock.cloneNode(true))
  )
}

const disableQuestionBlock = (questionId, chosenAnswer) => {
  const currentQuestionBlock = document.getElementById(
    questionId + '-questions'
  )

  Array.from(currentQuestionBlock.children).forEach(block => {
    if (block.children.item(1).innerText !== chosenAnswer) {
      block.style.opacity = '50%'
    }
  })
}

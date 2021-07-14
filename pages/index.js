import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(props) {
  return (
     <Box as="aside">
        <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}/>      

        <hr/>    
        <p>
          <a className="boxLink" href={`"https://github.com/${props.githubUser}`}>
            @{props.githubUser}
          </a>
        </p>
        <hr />

        <AlurakutProfileSidebarMenuDefault />
    </Box >
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              {props.title} ({props.items.length})
            </h2> 
            <ul>
            {/*followers.map((itemAtual) => {
                  return (
                    <li key={itemAtual}>
                      <a href={`http://github.com/${itemAtual}.png`}>
                       <img src={itemAtual.image} />
                        <span>{itemAtual.title}</span>
                      </a>
                  </li>
                  )
                })*/}  
              </ul>     
            </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'j0tappe';
  const [comunidades, setComunidades] = React.useState([
    {
    id: '1', 
    title: 'Meu nome é link, não Zelda',
    image: 'https://i.kym-cdn.com/photos/images/newsfeed/000/968/895/06c.gif'
    },
    {
      id: '2', 
      title: 'Emo is not dead',
      image: 'https://i.pinimg.com/originals/e7/33/97/e73397721852b661530198235380e388.jpg'
    },
    {
      id: '3', 
      title: 'E eu que fui emo?',
      image: 'https://s2.glbimg.com/aAZXpG_6GAd-2CUg3VFdd7hrhNk=/smart/e.glbimg.com/og/ed/f/original/2017/02/02/guilhermezaiden2.jpg'
    },

  ]);
  const pessoasFavoritas = [
    'HelioLuna', 
    'karenngomes', 
    'robertobdev', 
    'pedroaraujo20', 
    'CarlosWGama',
    'igoortc',
  ]

  const [followers, setFollowers] = React.useState([]);

  React.useEffect(function() {
    fetch('https://api.github.com/users/j0tappe/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function (respostaCompleta) {
      setFollowers(respostaCompleta);
    })
  }, [])

  return (
    <>
        < AlurakutMenu />
        <MainGrid>
          <div className="profileArea" style={{ gridArea: 'profileArea' }}>
            <ProfileSidebar githubUser={githubUser}/>
          </div>
          <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
            <Box>
              <h1 className="title">
                Bem-vindo(a)
              </h1>     

              <OrkutNostalgicIconSet />  
            </Box>

            <Box>
              <h2 className="subTitle">O que você deseja fazer?</h2>
              <form onSubmit={function handleCriaComunidade(event) {
                event.preventDefault();
                const dadosForm = new FormData(event.target);

                
                console.log('Campo: ', dadosForm.get('title'));
                console.log('Campo: ', dadosForm.get('image'));

                const comunidade = {
                  id: new Date().toISOString(),
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image'),
                }

                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);                
              }}>

                <div>
                  <input 
                    placeholder="Qual vai ser o nome da sua comunidade?" 
                    name="title" 
                    aria-label="Qual vai ser o nome da sua comunidade?"
                    type="text"
                  />
                </div>
                <div>
                  <input 
                    placeholder="Coloque uma URL para usarmos de capa" 
                    name="image" 
                    aria-label="Coloque uma URL para usarmos de capa"
                  />
                </div>

                <button>
                  Criar comunidade
                </button>
              </form>

            </Box>
          </div>
          <div  className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
            <ProfileRelationsBox title="Seguidores" items={followers} />
            <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2> 
            <ul>
                {comunidades.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`/users/${itemAtual.title}`}>
                       <img src={itemAtual.image} />
                        <span>{itemAtual.title}</span>
                      </a>
                  </li>
                  )
                })}  
              </ul>     
            </ProfileRelationsBoxWrapper>
            <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2> 

              <ul>
                {pessoasFavoritas.map((githubUser) => {
                  return (
                    <li key={githubUser}>
                      <a href={`/users/${githubUser}`}>
                        <img src={`https://github.com/${githubUser}.png`} />
                        <span>{githubUser}</span>
                      </a>
                  </li>
                  )
                })}  
              </ul>     
            </ProfileRelationsBoxWrapper>
          </div>
        </MainGrid>
      </>
  )
}

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

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'a6611c2a090121356c950c772b3296',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
          allCommunities {
            title
            id
            imageUrl
            creatorSlug
        }
      }` })
    })

    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesDATO = respostaCompleta.data.allCommunities;
      console.log(comunidadesDATO)
      setComunidades(comunidadesDATO)      
    })
  }, [])

  return (
    <>
        <title>emokut®</title>
        < AlurakutMenu githubUser={githubUser}/>
        
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
              <form onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(event.target);

                console.log('Campo: ', dadosDoForm.get('title'));
                console.log('Campo: ', dadosDoForm.get('image'));

                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorSlug: githubUser,
                }

                fetch('/api/comunitie', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas)
                })
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
                      <a href={`/comunities/${itemAtual.id}`}>
                       <img src={itemAtual.imageUrl} />
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

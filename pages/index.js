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

export default function Home() {
  const githubUser = 'j0tappe';
  const [comunidades, setComunidades] = React.useState([{
    id: '12802378123789378912789789123896123', 
    title: 'Meu nome é link, não Zelda',
    image: 'https://i.kym-cdn.com/photos/images/newsfeed/000/968/895/06c.gif'
  }]);
  const pessoasFavoritas = [
    'HelioLuna', 
    'karenngomes', 
    'robertobdev', 
    'pedroaraujo20', 
    'CarlosWGama',
    'igoortc',
  ]

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

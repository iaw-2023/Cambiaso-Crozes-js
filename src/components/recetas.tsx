import { useEffect, useState } from "react";
import { Card, Container, Stack } from "react-bootstrap";

function Recetas() {

    const [recipes, setRecipes] = useState([{
        name: "",
        image: "",
        instructions: [{
            display_text: "",
        }],
    }]);

    async function getRecipes() {
        try {        
            
            const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=3&q=cream+cheese';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '8416001247msha23e239ec485ebfp13c7f0jsn25efce339448',
                    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
                }
            });
            const data = await response.json();
            const recetas = [];
            for(let i = 0; i < data.results.length; i++) {
                const meal = normalizeMeal(data.results[i]);
                recetas.push(meal);
            }
            setRecipes(recetas);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRecipes();
    }, [])

    function normalizeMeal(meal:any) {
        const newMeal = {
            name: "",
            image: "",
            instructions: [{
                display_text: "",
            }],
        }
      
        newMeal.name = meal.name;
        newMeal.image = meal.thumbnail_url;
        newMeal.instructions = [];

        for(let i=0; i<meal.instructions.length; i++) {
          if(meal.instructions[i].display_text !== '') {
            newMeal.instructions.push({
              display_text: (i+1) + ". " + meal.instructions[i].display_text,
            })
          }
        }
        return newMeal;
    }


    return (
        <Container>
            <Stack direction="vertical" gap={2}>
            {recipes.map((receta:any, idx:any) => (                   
                <Card key={idx} bg="warning">
                    <Card.Header as="h5">{receta.name}</Card.Header>
                    <Card.Img variant="bottom" src={receta.image}/>
                    <Card.Body>
                        <Card.Title>Instrucciones</Card.Title>
                        <Card.Text>

                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
            </Stack>
        </Container>
    );
}
export default Recetas;




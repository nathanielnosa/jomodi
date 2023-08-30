import {
    Image,
    Card,
    Text,
    Group,
    Loader,
    Checkbox,
    Radio,
    Divider,
    Modal,
    UnstyledButton,
    Button,
    TextInput,
    SimpleGrid,
    Badge,
    Center,
    Menu,
    rem,
    Select,
    Grid,
  } from "@mantine/core";

function NewStylesCard() {

    return(
        <div>
            <Grid>
  <Grid.Col xs={12} className="text-center">
    <div style={{ width: '85%', margin: '0 auto' }} className="pt-6">
      <Card shadow="sm" padding="lg" radius="lg" withBorder
      className="pt-14"
      style={{
        background: 'linear-gradient(to right top, #f86e7e, #e694a5, #d0bad2, #bac0f8, #a6c5ff)',
        backgroundImage: 'url("https://images.meesho.com/images/marketing/1678691892265_1200.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      >
        <Grid>
            <Grid.Col md={4} style={{ marginTop:'20rem' }}>
                <Button style={{width: '100px', height: '40px',backgroundColor:'black', color:'white'}}>View More</Button>

            </Grid.Col>

            <Grid.Col md={7}>
                <Grid>
                <Grid.Col md={4} className="mt-14">
                
                
                <div className="pt-10">
                <img src="https://images.meesho.com/images/marketing/1678691960553_200.webp"
                
                />
                
                </div>
                    <div className="pt-2">
                    <Button className="" style={{backgroundColor:'black', color:'white', height:'40px'}}>Home Decor</Button>
                        </div>                
            </Grid.Col>

            <Grid.Col md={4} className="mt-14">
                
                
                <div className="pt-10">
                <img src="https://images.meesho.com/images/marketing/1678691936892_200.webp" />

                </div>
                <div className="pt-2">
                    <Button className="" style={{backgroundColor:'black', color:'white', height:'40px'}}>Kitchen Appliances</Button>
                        </div>   
                
            </Grid.Col>
            <Grid.Col md={4} className="mt-14">
                
                
                <div className="pt-10">
                <img src="https://images.meesho.com/images/marketing/1678691925419_200.webp" />

                </div>
                <div className="pt-2">
                    <Button className="" style={{backgroundColor:'black', color:'white', height:'40px'}}>Health Care</Button>
                        </div>   
                
            </Grid.Col>
                </Grid>

            </Grid.Col>

            
            
        </Grid>
      </Card>
    </div>
  </Grid.Col>
</Grid>



        </div>
    )

}


export default NewStylesCard;
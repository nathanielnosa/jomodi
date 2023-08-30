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

function TopProductCard() {

    return(
        <div>
            <Grid>
  <Grid.Col xs={12} className="text-center">
    <div style={{ width: '85%', margin: '0 auto' }} className="pt-4">
      <Card shadow="sm" padding="lg" radius="lg" withBorder
      className="pt-14"
      style={{
        background: 'linear-gradient(to right top, #f86e7e, #e694a5, #d0bad2, #bac0f8, #a6c5ff)',
      }}
      >
        <Grid>
            <Grid.Col md={5}>
                <img src="https://images.meesho.com/images/marketing/1678691686252_400.webp"/>

            </Grid.Col>

            <Grid.Col md={7}>
                <Grid>

                <Grid.Col>
                    <div className="pt-19">
                    <Text className="" size={60} weight={500}>Be Fashion Forward</Text>
                    </div>
                </Grid.Col>
                <Grid.Col md={6} className="mt-14">
                
                
                <div className="pt-10">
                <img src="https://images.meesho.com/images/marketing/1678691699680_300.webp"
                
                />
                </div>
                
            </Grid.Col>

            <Grid.Col md={6} className="mt-14">
                
                
                <div className="pt-10">
                <img src="https://images.meesho.com/images/marketing/1678691712594_300.webp" />

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


export default TopProductCard;
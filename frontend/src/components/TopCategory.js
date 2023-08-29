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
                <Grid.Col span={6} className="" style={{paddingLeft:'18rem'}}>
                <Card shadow="sm" padding="" px={35} radius="lg" withBorder style={{width:'400px'}}>
                <Grid>
                        <Grid.Col span={12}>
                            <div className="text-center">
                            <Text size={27} weight={500}>Women's store</Text>
                            </div>
                        </Grid.Col>
                        <Grid.Col span={6}>
                        <Card shadow="sm" padding="sm" radius="lg" withBorder style={{backgroundColor:'#e4e4e7'}}>

                        <Card.Section>
                            
                            <Center  mx="">
                                <div className="py-4 px-1">
                                <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={160}
                            
                            
                            alt="Norway"
                            />
                                </div>

                            </Center>
                        </Card.Section>
                        </Card>
                        <div className="text-center">
                        <Text size={22} weight={500}>Fine Bag</Text>

                        </div>
                        </Grid.Col>

                        <Grid.Col span={6}>
                        <Card shadow="sm" padding="lg" radius="lg" withBorder style={{backgroundColor:'#e4e4e7'}}>

                        <Card.Section>
                            
                            <Center  mx="">
                                <div className="py-4 mx-1">
                                <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={160}
                            
                            alt="Norway"
                            />
                                </div>

                            </Center>
                        </Card.Section>
                        </Card>
                        <div className="text-center">
                        <Text size={22} weight={500}>Fine Bag</Text>

                        </div>
                        </Grid.Col>

                        <Grid.Col span={6}>
                        <Card shadow="sm" padding="lg" radius="lg" withBorder style={{backgroundColor:'#e4e4e7'}}>

                        <Card.Section>
                            
                            <Center  mx="">
                                <div className="py-6 px-1">
                                <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={160}
                            
                            alt="Norway"
                            />
                                </div>

                            </Center>
                        </Card.Section>
                        </Card>
                        <div className="text-center">
                        <Text size={22} weight={500}>Fine Bag</Text>

                        </div>
                        </Grid.Col>

                        <Grid.Col span={6}>
                        <Card shadow="sm" padding="lg" radius="lg" withBorder style={{backgroundColor:'#e4e4e7'}}>

                        <Card.Section>
                            
                            <Center  mx="1">
                                <div className="py-6">
                                <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={160}
                            
                            alt="Norway"
                            />
                            
                                </div>
                               

                            </Center>
                        </Card.Section>
                        
                        </Card>
                        <div className="text-center">
                        <Text size={22} weight={500}>Fine Bag</Text>

                        </div>
                        </Grid.Col>

                    </Grid>
                </Card>
                </Grid.Col>



                <Grid.Col span={4} className="" style={{marginTop:''}}>
                    
                    <Grid>
                        <Grid.Col>
                            <div className="text-center">
                            <Text size={40} weight={700}>Be Fashion Forward</Text>

                            </div>
                        </Grid.Col>
                        <Grid.Col md={6}>
                        <Card shadow="sm" padding="" px={35} radius="lg" withBorder style={{width:'210px', backgroundColor:'#F8F8FA'}}>
                <Grid>
                        <Grid.Col span={12}>
                            <div className="text-center">
                            <Text size={27} weight={500}>Men's store</Text>
                            </div>
                        </Grid.Col>
                        <Grid.Col span={6}>
                        <Card shadow="sm" padding="sm" radius="lg" withBorder style={{backgroundColor:'#e4e4e7'}}>

                        <Card.Section>
                            
                            <Center  mx="">
                                <div className="py-4 px-1">
                                <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={100}
                            
                            
                            alt="Norway"
                            />
                                </div>

                            </Center>
                        </Card.Section>
                        </Card>
                        <div className="text-center">
                        <Text size={22} weight={500}>Fine Bag</Text>

                        </div>
                        </Grid.Col>

                        <Grid.Col span={6}>
                        <Card shadow="sm" padding="lg" radius="lg" withBorder style={{backgroundColor:'#e4e4e7'}}>

                        <Card.Section>
                            
                            <Center  mx="">
                                <div className="py-4 mx-1">
                                <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={100}
                            
                            alt="Norway"
                            />
                                </div>

                            </Center>
                        </Card.Section>
                        </Card>
                        <div className="text-center">
                        <Text size={22} weight={500}>Fine Bag</Text>

                        </div>
                        </Grid.Col>

                        <Grid.Col span={6}>
                        <Card shadow="sm" padding="lg" radius="lg" withBorder style={{backgroundColor:'#e4e4e7'}}>

                        <Card.Section>
                            
                            <Center  mx="">
                                <div className="py-6 px-1">
                                <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={100}
                            
                            alt="Norway"
                            />
                                </div>

                            </Center>
                        </Card.Section>
                        </Card>
                        <div className="text-center">
                        <Text size={22} weight={500}>Fine Bag</Text>

                        </div>
                        </Grid.Col>

                        <Grid.Col span={6}>
                        <Card shadow="sm" padding="lg" radius="lg" withBorder style={{backgroundColor:'#e4e4e7'}}>

                        <Card.Section>
                            
                            <Center  mx="1">
                                <div className="py-6">
                                <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={100}
                            
                            alt="Norway"
                            />
                                </div>

                            </Center>
                        </Card.Section>
                        </Card>
                        <div className="text-center">
                        <Text size={22} weight={500}>Fine Bag</Text>

                        </div>
                        </Grid.Col>

                    </Grid>
                </Card>
                        </Grid.Col>


                        <Grid.Col md={4}>
                        <Card shadow="sm" padding="" px={35} radius="lg" withBorder style={{width:'210px', backgroundColor:'#F8F8FA'}}>
                <Grid>
                        <Grid.Col span={12}>
                            <div className="text-center">
                            <Text size={27} weight={500}>Kid's store</Text>
                            </div>
                        </Grid.Col>
                        <Grid.Col span={6}>
                        <Card shadow="sm" padding="sm" radius="lg" withBorder style={{backgroundColor:'#e4e4e7'}}>

                        <Card.Section>
                            
                            <Center  mx="">
                                <div className="py-4 px-1">
                                <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={100}
                            
                            
                            alt="Norway"
                            />
                                </div>

                            </Center>
                        </Card.Section>
                        </Card>
                        <div className="text-center">
                        <Text size={22} weight={500}>Fine Bag</Text>

                        </div>
                        </Grid.Col>

                        <Grid.Col span={6}>
                        <Card shadow="sm" padding="lg" radius="lg" withBorder style={{backgroundColor:'#e4e4e7'}}>

                        <Card.Section>
                            
                            <Center  mx="">
                                <div className="py-4 mx-1">
                                <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={100}
                            
                            alt="Norway"
                            />
                                </div>

                            </Center>
                        </Card.Section>
                        </Card>
                        <div className="text-center">
                        <Text size={22} weight={500}>Fine Bag</Text>

                        </div>
                        </Grid.Col>

                        <Grid.Col span={6}>
                        <Card shadow="sm" padding="lg" radius="lg" withBorder style={{backgroundColor:'#e4e4e7'}}>

                        <Card.Section>
                            
                            <Center  mx="">
                                <div className="py-6 px-1">
                                <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={100}
                            
                            alt="Norway"
                            />
                                </div>

                            </Center>
                        </Card.Section>
                        </Card>
                        <div className="text-center">
                        <Text size={22} weight={500}>Fine Bag</Text>

                        </div>
                        </Grid.Col>

                        <Grid.Col span={6}>
                        <Card shadow="sm" padding="lg" radius="lg" withBorder style={{backgroundColor:'#e4e4e7'}}>

                        <Card.Section>
                            
                            <Center  mx="1">
                                <div className="py-6">
                                <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={100}
                            
                            alt="Norway"
                            />
                                </div>

                            </Center>
                        </Card.Section>
                        </Card>
                        <div className="text-center">
                        <Text size={22} weight={500}>Fine Bag</Text>

                        </div>
                        </Grid.Col>

                    </Grid>
                </Card>
                        </Grid.Col>

                        
                    </Grid>
                </Grid.Col>
                
                
                
            </Grid>
        </div>
    )

}


export default TopProductCard;
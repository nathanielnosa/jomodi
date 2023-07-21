import React, {useState, useEffect} from 'react'
import { API_URL } from '../constants'
import axios from 'axios'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, Text } from '@mantine/core';

function NewsLetter() {
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    const [showModal, setShowModal] = useState(false)   
    const [error, setError] = useState(false)
    const [showError, setShowError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${API_URL}newsletter/newsletter/`, {
            email: email
        })
        .then(res => {
            console.log(res.data)
            setSuccess(true)
            setShowModal(true)
        })
        .catch(err => {
            console.log(err)
            setError(true)
            setShowError(true)
        })
    }
  return (
      <div id="newsletter" className="section">
          <Modal opened={showModal} onClose={() => setShowModal(false)} centered>
              <Text fw={700} fz="lg">Thank you for subscribing to our newsletter! 🎉</Text>
              <Text>
                  You are now part of our exclusive community, and we're thrilled to have you on board. Get ready for a world of exciting updates, amazing deals, and valuable insights delivered straight to your inbox.
              </Text>
          </Modal>
          <Modal opened={showError} onClose={() => setShowError(false)} centered>
              <Text fw={700} fz="xl">This Email is already Subscribed to our newsletter 🎉</Text>
          </Modal>
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                      <div className="newsletter">
                          
                          <p>Sign Up for the <strong>NEWSLETTER</strong></p>
                          <form>
                              <input className="input" type="email" placeholder="Enter Your Email" 
                              value={email} onChange={(e) => setEmail(e.target.value)}
                              />
                                  <button className="newsletter-btn" onClick={handleSubmit}><i className="fa fa-envelope"></i> Subscribe</button>
                          </form>
                          <ul className="newsletter-follow">
                              <li>
                                  <a href="#"><i className="fa fa-facebook"></i></a>
                              </li>
                              <li>
                                  <a href="#"><i className="fa fa-twitter"></i></a>
                              </li>
                              <li>
                                  <a href="#"><i className="fa fa-instagram"></i></a>
                              </li>
                              <li>
                                  <a href="#"><i className="fa fa-pinterest"></i></a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
   
          </div>
   
      </div>
  )
}

export default NewsLetter
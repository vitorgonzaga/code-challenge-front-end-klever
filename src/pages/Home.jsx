import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import ListTokens from '../components/ListTokens';

export default function Home() {
  return (
    <Container>
      <Header />
      <ListTokens />
    </Container>
  );
}

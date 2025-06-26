import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'
import { format } from 'date-fns'

interface OrderReceivedEmailProps {
  orderId: string
  orderDate: string
  shippingAddress: {
    street: string
    city: string
    state: string | null
    postalCode: string
    country: string
  }
}

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const OrderReceivedEmail = ({
  orderId,
  orderDate,
  shippingAddress,
}: OrderReceivedEmailProps) => {
  const formattedDate = format(new Date(orderDate), 'dd LLL, yyyy')

  return (
    <Html>
      <Head />
      <Preview>Your order summary and estimated delivery date</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={message}>
            <Img
              src={`${baseUrl}/snake.png`}
              width='65'
              height='73'
              alt='delivery snake'
              style={{ margin: 'auto' }}
            />
            <Text style={global.heading}>Thank you for your order!</Text>
            <Text style={global.text}>
              We're preparing everything for delivery and will notify you once
              your package has been shipped. Delivery usually takes 2 days.
            </Text>
            <Text style={{ ...global.text, marginTop: 24 }}>
              If you have any questions regarding your order, please feel free
              to contact us with your order number and we're here to help.
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Text style={adressTitle}>Shipping to: {shippingAddress.street}</Text>
            <Text style={{ ...global.text, fontSize: 14 }}>
              {shippingAddress.street}, {shippingAddress.city},{' '}
              {shippingAddress.state} {shippingAddress.postalCode}
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Row style={{ display: 'inline-flex', marginBottom: 40 }}>
              <Column style={{ width: 170 }}>
                <Text style={global.paragraphWithBold}>Order Number</Text>
                <Text style={track.number}>{orderId}</Text>
              </Column>
              <Column>
                <Text style={global.paragraphWithBold}>Order Date</Text>
                <Text style={track.number}>{formattedDate}</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={paddingY}>
            <Row>
              <Text
                style={{
                  ...footer.text,
                  paddingTop: 30,
                  paddingBottom: 30,
                }}>
                Please contact us if you have any questions. (If you reply to
                this email, we won't be able to see it.)
              </Text>
            </Row>
            <Row>
              <Text style={footer.text}>
                © CaseCobra, Inc. All Rights Reserved.
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default OrderReceivedEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '560px',
}

const message = {
  padding: '40px 74px',
  textAlign: 'center',
} as React.CSSProperties

const adressTitle = {
  ...message,
  fontSize: '20px',
  lineHeight: '26px',
}

const global = {
  paddingX: '40px',
  paddingY: '20px',
  defaultPadding: {
    padding: '0 40px',
  },
  heading: {
    fontSize: '32px',
    lineHeight: '1.3',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: '-1px',
  } as React.CSSProperties,
  text: {
    ...message,
    fontSize: '14px',
    lineHeight: '24px',
    color: '#747474',
  },
  button: {
    backgroundColor: '#5F51E8',
    borderRadius: '3px',
    color: '#FFF',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px 24px',
  },
  hr: {
    borderColor: '#E5E5E5',
    margin: '0',
  },
  paragraphWithBold: { ...message, fontWeight: 'bold' },
}

const track = {
  container: {
    padding: '22px 40px',
    backgroundColor: '#F7F7F7',
  },
  number: {
    margin: '12px 0 0 0',
    fontWeight: 500,
    lineHeight: '1.4',
    color: '#6F6F6F',
  },
}

const paddingY = {
  padding: '20px 0',
}

const footer = {
  policy: {
    width: '166px',
    margin: 'auto',
  },
  text: {
    margin: '0',
    color: '#AFAFAF',
    fontSize: '13px',
    textAlign: 'center',
  } as React.CSSProperties,
} 
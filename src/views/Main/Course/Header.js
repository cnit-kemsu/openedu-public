import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { History } from '@kemsu/router';
import { Mutation, refetch } from '@kemsu/graphql-client';
import { Notifications } from '@kemsu/core';
import { UserInfo } from '@lib/UserInfo';
import { COURSE_DELIVERY_INSTANCE } from './';
import { Header as useStyles } from './styles';
import defaultCourseImage from '../course_default_img.jpg';

const ENROLL_IN_COURSE = ({
  id = 'Int!'
}) => `
  enrollInCourse(
    courseId: ${id}
  )
`;

function onCompleteEnroll() {
  refetch(COURSE_DELIVERY_INSTANCE);
  Notifications.push('Вы были успешно записаны на курс.', 'success');
}

const PURCHASE = ({
  id = 'Int!'
}) => `
  createPayment(
    courseId: ${id}
  )
`;

function onCompletePurchase({ createPayment: request }) {
  
  const form = document.createElement('form');
  //form.action='https://mdm-webapi-mdmpay-financial-staging.mdmbank.ru/web/v1/payment';
  form.action='https://pay.mdm.ru/web/v1/payment';
  form.method='POST';
  //form.target='_blank';
  
  const input=document.createElement('input');
  input.type='hidden';
  input.name='request';
  input.value=request;

  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
}

const enroll = new Mutation(ENROLL_IN_COURSE, { onComplete: onCompleteEnroll }).commit;
const purchase = new Mutation(PURCHASE, { onComplete: onCompletePurchase }).commit;

function performIfSignedIn(action, ...args) {
  if (UserInfo.isSignedIn) action(...args);
  else History.push('/account/signin');
}

function CourseHeader({ course: { id, name, summary, picture, price, enrollmentEndDate, isCurrentUserEnrolled } }) {

  const _enrollmentEndDate = enrollmentEndDate != null ? new Date(enrollmentEndDate) : null;
  const availableToEnroll = _enrollmentEndDate == null || _enrollmentEndDate >= new Date();
  
  const classes = useStyles();
  return <div className={classes.root}>

    <div className={classes.inner}>

      <div className={classes.info}>

        <Typography className={classes.name} variant="h4">{name}</Typography>
        {summary && <Typography className={classes.summary}>{summary}</Typography>}

        {UserInfo.isStudent &&
          <div>
            {isCurrentUserEnrolled
            ? <Typography variant="h6" color="primary">Вы записаны на этот курс</Typography>
            : (
              availableToEnroll ? (
              price == null
              ? <div>
                <Typography color="primary">Чтобы получить доступ к материалам курса, вам необходимо записаться на курс</Typography>
                <Button style={{ marginTop: '12px' }} color="primary" variant="contained" onClick={() => performIfSignedIn(enroll, { id })}>Записаться на курс</Button>
              </div>
              : <div>
                <Typography color="primary">Чтобы получить доступ к материалам курса, вам необходимо произвести оплату</Typography>
                <div ыен className={classes.priceContainer}>
                  <Button className={classes.purchaseButton} color="primary" variant="contained" onClick={() => performIfSignedIn(purchase, { id })}>Перейти к оплате</Button> 
                  <Typography color="primary" className={classes.price}>Стоимость курса: {price} руб.</Typography>
                </div>
                 
              </div>
              ) : <Typography color="secondary" variant="h6">Регистрация на курс закончена</Typography>
            )}
          </div>
        }

      </div>

      <div className={classes.pictureContainer}>
        <img className={classes.picture} src={picture != null ? ('/files/' + picture.fileSourceKey) : defaultCourseImage} />
      </div>

    </div>

  </div>;
}

export default memo(CourseHeader);



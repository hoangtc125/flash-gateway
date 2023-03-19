import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './pc.reducer';

export const PcDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const pcEntity = useAppSelector(state => state.flashgateway.pc.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="pcDetailsHeading">
          <Translate contentKey="flashGatewayApp.flashAppPc.detail.title">Pc</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{pcEntity.id}</dd>
          <dt>
            <span id="make">
              <Translate contentKey="flashGatewayApp.flashAppPc.make">Make</Translate>
            </span>
          </dt>
          <dd>{pcEntity.make}</dd>
          <dt>
            <span id="model">
              <Translate contentKey="flashGatewayApp.flashAppPc.model">Model</Translate>
            </span>
          </dt>
          <dd>{pcEntity.model}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="flashGatewayApp.flashAppPc.price">Price</Translate>
            </span>
          </dt>
          <dd>{pcEntity.price}</dd>
        </dl>
        <Button tag={Link} to="/pc" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/pc/${pcEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PcDetail;

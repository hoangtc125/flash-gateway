import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPc } from 'app/shared/model/flashApp/pc.model';
import { getEntity, updateEntity, createEntity, reset } from './pc.reducer';

export const PcUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const pcEntity = useAppSelector(state => state.flashgateway.pc.entity);
  const loading = useAppSelector(state => state.flashgateway.pc.loading);
  const updating = useAppSelector(state => state.flashgateway.pc.updating);
  const updateSuccess = useAppSelector(state => state.flashgateway.pc.updateSuccess);

  const handleClose = () => {
    navigate('/pc');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...pcEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...pcEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="flashGatewayApp.flashAppPc.home.createOrEditLabel" data-cy="PcCreateUpdateHeading">
            <Translate contentKey="flashGatewayApp.flashAppPc.home.createOrEditLabel">Create or edit a Pc</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="pc-id" label={translate('global.field.id')} validate={{ required: true }} />
              ) : null}
              <ValidatedField label={translate('flashGatewayApp.flashAppPc.make')} id="pc-make" name="make" data-cy="make" type="text" />
              <ValidatedField
                label={translate('flashGatewayApp.flashAppPc.model')}
                id="pc-model"
                name="model"
                data-cy="model"
                type="text"
              />
              <ValidatedField
                label={translate('flashGatewayApp.flashAppPc.price')}
                id="pc-price"
                name="price"
                data-cy="price"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/pc" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PcUpdate;

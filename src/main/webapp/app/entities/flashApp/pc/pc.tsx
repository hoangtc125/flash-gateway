import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPc } from 'app/shared/model/flashApp/pc.model';
import { getEntities } from './pc.reducer';

export const Pc = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const pcList = useAppSelector(state => state.flashgateway.pc.entities);
  const loading = useAppSelector(state => state.flashgateway.pc.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="pc-heading" data-cy="PcHeading">
        <Translate contentKey="flashGatewayApp.flashAppPc.home.title">Pcs</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="flashGatewayApp.flashAppPc.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/pc/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="flashGatewayApp.flashAppPc.home.createLabel">Create new Pc</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {pcList && pcList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="flashGatewayApp.flashAppPc.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="flashGatewayApp.flashAppPc.make">Make</Translate>
                </th>
                <th>
                  <Translate contentKey="flashGatewayApp.flashAppPc.model">Model</Translate>
                </th>
                <th>
                  <Translate contentKey="flashGatewayApp.flashAppPc.price">Price</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pcList.map((pc, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/pc/${pc.id}`} color="link" size="sm">
                      {pc.id}
                    </Button>
                  </td>
                  <td>{pc.make}</td>
                  <td>{pc.model}</td>
                  <td>{pc.price}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/pc/${pc.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/pc/${pc.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/pc/${pc.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="flashGatewayApp.flashAppPc.home.notFound">No Pcs found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Pc;

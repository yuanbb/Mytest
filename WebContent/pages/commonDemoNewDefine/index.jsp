<%@ page contentType="text/html;charset=utf-8"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<head>
<title>流量分析</title>
<%@ include file="/common/jq183.jsp"%>
<%@ include file="/common/fontawesome/fontawesome4.3.0.jsp"%>
<%@ include file="/common/bootstrap.jsp"%>
<%@ include file="/pages/common/jquery-ui-bootstrap.jsp"%>
<%@ include file="/pages/common/inas-common.jsp"%>
<%@ include file="/pages/common/inas-product-style.jsp"%>
<%@ include file="/pages/common/inas-loadmask.jsp"%>
<%@ include file="/pages/common/inas-my97.jsp"%>
<%@ include file="/pages/common/inas-export.jsp"%>
<%@ include file="/pages/common/bootstrap-third.jsp"%>
<%@ include file="/common/eui.jsp"%> 


<c:set var="mainJs" value="${ctx}/scripts/commonDemoNewDefine/mainJs.js" />
<%@ include file="/common/require.jsp"%>
</head>
<body>
<div>
    <div>
    	<input id="refresh" type="button" class="btn btn-primary" style="float: right;" value="刷新" />
    </div>
	<div class="con_chart" >
		<div id="index_chart_bar" style="height:340px;"></div> 
	</div> 
</div>	


</body>
</html>